import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DateTimeDto } from "src/tasks/application/dtos/update-task/date-time.dto";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { DateUtil } from "src/utils/date-util";

@Injectable()
export class UpdateDateTime {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly dateUtil: DateUtil) {
    }
    async apply(taskId: string, dto: DateTimeDto) {
        const task = await this.model.findById(taskId);

        if (!task) {
            throw new NotFoundException("task not found");
        }

        task.time = task.time.map((dateTimeFromDb) => {
            if (dateTimeFromDb._id == dto._id) {
                return Object.assign(dateTimeFromDb, { ...dto, time: this.dateUtil.minutesToMilliseconds(dto.time) });
            }

            return dateTimeFromDb;
        });
        task.date = dto.date;
        return await task.save();
    }
}