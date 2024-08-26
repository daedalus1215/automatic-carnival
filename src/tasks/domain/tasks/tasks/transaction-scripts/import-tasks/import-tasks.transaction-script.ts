import { Injectable } from "@nestjs/common";
import { TaskRepository } from "src/tasks/infrastructure/repositories/task-repository";
import { Task } from "src/tasks/infrastructure/schema/task/task.schema";

@Injectable()
export class ImportTasksTS {

    constructor(private readonly taskRepository: TaskRepository) { }

    async apply(tasks: Task[]) {
        return this.taskRepository.createTasks(tasks);
    }
}