import { Expose } from "class-transformer";
import { DateTimeDto } from "./date-time.dto";

export class UpdateTaskDto {
    @Expose()
    date: string;

    @Expose()
    dateTimes: DateTimeDto[];

    @Expose()
    description: string;

    @Expose()
    tags: string[];

    @Expose()
    taskId: string;

    @Expose()
    time: number;

    @Expose()
    title: string;
}