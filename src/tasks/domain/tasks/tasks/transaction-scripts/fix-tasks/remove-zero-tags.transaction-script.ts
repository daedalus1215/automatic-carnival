import { Injectable } from "@nestjs/common";
import { TaskRepository } from "src/tasks/infrastructure/repositories/task-repository";
import { Task } from "src/tasks/infrastructure/schema/task/task.schema";

@Injectable()
export class RemoveZeroTags {
    constructor(private readonly taskRepository: TaskRepository) { }

    async apply() {
        const tasksWithZeroTags = await this.taskRepository.findAllTasksWithZeroValuedTags();
        return tasksWithZeroTags.map(async (task) => {
            const updatedTask = await this.taskRepository.updateOne({   ...task, tags: task.tags.filter(tag => tag !== (0 as unknown as string)) });
            return updatedTask;
          });
    }
}