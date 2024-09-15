import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../schema/task/task.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>) { }

    async updateOne(task: any) {
        console.log('task.id', task.id)
        return this.model.updateOne({_id: task._id}, task);
    }

    async createTasks(tasks: Task[]) {
        return await Promise.all(
            tasks.map(async (task) => {
                return this.model.create(task);
            }),
        );
    }

    async findAllTasksWithZeroValuedTags() {
        return this.model.find({ tags: { $eq: 0 } })
    }

}