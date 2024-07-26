import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";

@Injectable()
export class ImportTasksTS {

    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>) { }

    async apply(tasks: Task[]) {
        tasks.forEach(async task => {
            const tempTask = await this.model.create(task);
            tempTask.save();
        })
    }
}