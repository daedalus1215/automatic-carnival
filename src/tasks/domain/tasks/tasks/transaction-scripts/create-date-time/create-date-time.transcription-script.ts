import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { TimeVO } from "src/tasks/infrastructure/schema/task/time.vo";
import { DateUtil } from "src/utils/date-util";

@Injectable()
export class CreateDateTimeOfTaskTS {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>, private readonly dateUtil: DateUtil) { }

    async apply(taskId: string) {
        const task = await this.model.findOne({ _id: taskId });
        // @TODO: add this to my UTs
        if (!task) {
            throw new NotFoundException(`no task with taskId ${taskId}`)
        }
        const { time } = task;
        time.push({
            date: new Date(),
            time: this.dateUtil.minutesToMilliseconds("00:00"),
        } as unknown as TimeVO);

        task.time = time;
        task.date = new Date().toString();
        const updatedTask = await task.save();
        return updatedTask;
    }
}