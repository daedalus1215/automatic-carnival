import { CallHandler, ClassSerializerInterceptor, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

// any class is acceptable
export interface ClassConstructor {
    new(...args: any[]): {}
}

export const Serialize = (dto: ClassConstructor) => {
    return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {
        this.dto = dto;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(map((data: ClassConstructor) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                });
            }));
    }
}