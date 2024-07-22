import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { DateUtil } from "src/utils/date-util";
import { StringUtil } from "src/utils/string-util";

@Injectable()
export class FetchAllTaskTitles {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly dateUtil: DateUtil,
        private readonly stringUtil: StringUtil) { }


    async apply(title?: string) {
        console.log('hi');
        try {
            const tasks = await this.model.find();
            console.log('ho');

            tasks.sort(this.dateUtil.sort); // Sort tasks by date in descending order
            const formattedName = title?.toLowerCase();

            return tasks
                .filter((task) => {
                    if (title) {
                        return task?.title?.toLowerCase().includes(formattedName) ?? false;
                    }
                    return true;
                })
                .map((task) => ({
                    id: task._id,
                    title: (task.title !== undefined) ? this.stringUtil.truncateString(task.title, 21) : 'no title'
                }));
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Failed to fetch tasks');
        }
    }

}