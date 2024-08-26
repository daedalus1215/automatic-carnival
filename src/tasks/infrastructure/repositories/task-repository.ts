import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../schema/task/task.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>) { }

    async create(task: Task) {
        return this.model.create(task);
    }

    async createTasks(tasks: Task[]) {
        return await Promise.all(
            tasks.map(async (task) => {
                return this.model.create(task);
            }),
        );
    }

    async findAllTasksWithZeroValuedTags() {
        return this.model.find({tags: {"$eq": 0}})
    }

}