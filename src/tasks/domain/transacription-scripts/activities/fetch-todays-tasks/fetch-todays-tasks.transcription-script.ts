import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { DateUtil } from "src/utils/date-util";
import { FilterUtil } from "src/utils/filter-util";

@Injectable()
export class FetchTodaysTasks {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly dateUtil: DateUtil,
        private readonly filterUtil: FilterUtil) { }

    //@TODO: Double check to make sure it is excluding
    async apply(reqDate: string, includeTags?: string[], excludeTags?: string[]) {
        const tasks = await this.model.find({});
        const date = this.dateUtil.getDateInISOFormat(reqDate);
        const today = this.dateUtil.parseDate(date);

        const newTasks = tasks.filter(task => task.time
            .filter(t1 => !!t1?.date)
            .find(t1 => this.dateUtil.compareFormattedDate(t1.date, today)));

        const aggActivities = {
            activities: this.filterUtil.inclusiveFilter(this.filterUtil.exclusiveFilter(newTasks, excludeTags), includeTags)
                .map((task) => ({
                    taskId: task?.id ?? 'stubAnId',
                    title: task?.title ?? 'no title',
                    date: task.date,
                    totalTimeToday: task.time
                        .filter(t1 => !!t1?.date)
                        .filter(t1 => this.dateUtil.compareFormattedDate(t1.date, today))
                        .map(t1 => t1.time)
                        .reduce((t1, t2) => t1 + t2, 0),
                    times: task.time
                        .filter(t1 => !!t1?.date)
                        .filter(t1 => this.dateUtil.compareFormattedDate(t1.date, today))
                })),
            total: 0
        };
        aggActivities.total = aggActivities.activities
            .map(activity => activity.totalTimeToday)
            .reduce((a1, a2) => a1 + a2, 0);

        return aggActivities;
    };
}