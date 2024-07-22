import { Expose } from "class-transformer";

export class DateTimeDto {
    @Expose()
    date:string;

    @Expose()
    _id:string;

    @Expose()
    time:string;
}