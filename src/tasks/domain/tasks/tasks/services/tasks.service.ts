import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../../../../infrastructure/schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../../../../application/dtos/update-task/update-task.dto';
import { DateTimeDto } from '../../../../application/dtos/update-task/date-time.dto';
import { DateUtil } from '../../../../../utils/date-util';
import { StringUtil } from '../../../../../utils/string-util';
import { FetchAllTaskTitlesTS } from '../transaction-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTaskTS } from '../transaction-scripts/create-date-time/create-date-time.transcription-script';
import { ImportTasksTS } from '../transaction-scripts/import-tasks/import-tasks.transaction-script';
import { UpdateDateTime } from '../transaction-scripts/update-date-time/update-date-time.transcription-script';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly fetchAllTaskTitlesTS: FetchAllTaskTitlesTS,
        private readonly createDateTimeOfTaskTS: CreateDateTimeOfTaskTS,
        private readonly importTasksTS: ImportTasksTS,
        private readonly updateDateTime: UpdateDateTime,
        private readonly stringUtil: StringUtil,
        private readonly dateUtil: DateUtil) { }

    async findAll() {
        return await this.model.find();
    }

    async findOne(id?: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.model.findById(id);
    }

    async update(dto?: UpdateTaskDto) {
        if (!dto) {
            throw new Error('dto')
        }
        return await this.model.updateOne({ _id: dto.taskId }, dto);
    }

    //@TODO: Unit test this
    async fetchAllTitles(title: string) {
        return await this.fetchAllTaskTitlesTS.apply(title);
    }

    //@TODO: Unit Test this
    async createNewTask() {
        const task = await this.model.create({
            tags: [],
            description: '',
            date: new Date(),
            title: '',
            time: []
        });
        return await this.hydrate(task.save());
    }

    // @TODO: NOt the place for this
    //@TODO: Unit Test this
    hydrate(doc) {
        if (!doc) {
            return new NotFoundException("Task not found");
        }

        return {
            taskId: doc.id,
            description: doc?.description || '',
            tags: doc?.tags || [],
            date: doc?.date || '',
            contractId: doc.contractId || '',
            title: this.stringUtil.getTitle(doc),
            time: doc?.time ?
                doc.time.map(a => parseInt(a.time))
                    .reduce((a, b) => a + b, 0)
                : 0,
            dateTimes: doc?.time ?
                doc.time.filter(dateTime => dateTime?.date)
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map(dateTime => {
                        const date = dateTime.date;
                        const id = dateTime._id;
                        const time = this.dateUtil.millisToMinutesAndSeconds(dateTime.time);
                        return { id, date, time };
                    })
                : [],
        };
    }

    async delete(id: string): Promise<any> {
        return await this.model.deleteOne({ _id: id });
    }

    async deleteAll(): Promise<any> {
        return await this.model.deleteMany({});
    }

    //@TODO: Migrate to a DateTimeService
    //@TODO: Unit test this
    async updateDateTimeOfTask(taskId: string, dto: DateTimeDto) {
        return this.updateDateTime.apply(taskId, dto);
    }

    //@TODO: Unit test this
    async createDateTime(taskId: string) {
        return this.createDateTimeOfTaskTS.apply(taskId);
    }

    //@TODO: Unit test this
    async importTasks(tasks: Task[]) {
        await this.importTasksTS.apply(tasks)
    }
}