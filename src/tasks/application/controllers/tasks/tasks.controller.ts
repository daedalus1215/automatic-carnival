import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { TasksService } from '../../../domain/tasks/tasks/services/tasks.service'
import { UpdateTaskDto } from '../../dtos/update-task/update-task.dto'
import { DateTimeDto } from '../../dtos/update-task/date-time.dto'
import { Task } from 'src/types'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  async findAll() {
    return await this.taskService.findAll()
  }

  @Post()
  async createNewTask() {
    return await this.taskService.createNewTask()
  }

  @Put()
  async updateTask(@Body() body: UpdateTaskDto) {
    return await this.taskService.update(body)
  }

  @Get('/tasks-titles')
  async fetchAllTaskTitles(@Query('title') title: string) {
    return await this.taskService.fetchAllTitles(title)
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id)
  }

  @Delete('/:id')
  async deleteTask(@Query('id') id: string) {
    return await this.taskService.delete(id)
  }

  @Delete()
  async deleteTasks() {
    return await this.taskService.deleteAll()
  }

  // migrate to a datetime controller
  @Post('/:taskId/dateTime')
  async postDateTimeAction(@Param('taskId') taskId: string) {
    return await this.taskService.createDateTime(taskId)
  }

  @Put('/:taskId/dateTime')
  async updateDateTimeOfTask(@Param('taskId') taskId, @Body() body: DateTimeDto) {
    console.log('updateTask', body)
    return await this.taskService.updateDateTimeOfTask(taskId, body)
  }

  //@TODO: Add test for me
  @Post('/import')
  async importTasks(@Body() body: Task[]) {
    return await this.taskService.importTasks(body)
  }
}
