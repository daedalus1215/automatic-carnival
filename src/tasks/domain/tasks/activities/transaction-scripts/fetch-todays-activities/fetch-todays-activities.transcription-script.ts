import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { DateUtil } from "src/utils/date-util";
import { FilterUtil } from "src/utils/filter-util";

@Injectable()
export class FetchTodaysActivities {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly dateUtil: DateUtil,
        private readonly filterUtil: FilterUtil) { }

    async apply(includeTags: string[], excludeTags: string[]) {
        const tasks = await this.model.find();
        const filtered = tasks.filter(task => task?.date);
        const results = {};
        const excludedFilters = this.filterUtil.exclusiveFilter(filtered, excludeTags)
        const includedFilters = this.filterUtil.inclusiveFilter(excludedFilters, includeTags)

        includedFilters.forEach(task => {
            task.time
                .filter(time => time?.date)
                .map(time => {
                    const theDate = this.dateUtil.formatDate(time.date);
                    if (!results[theDate]) {
                        results[theDate] = { time: 0, titles: [] };
                    }

                    results[theDate].time += time.time;

                    // because we do not need to add the title more than once
                    const title = task?.title ?? 'no title';
                    if (results[theDate]?.titles.indexOf(title) === -1) {
                        results[theDate].titles.push(title);
                    }
                });
        });
        const newResults = [];
        const keys = Object.keys(results);

        for (let key of keys) {
            newResults.push({
                date: key,
                ...results[key]
            })
        }

        // @TODO: This will probably break if the record count is less than 365. 
        return newResults
            .sort(this.dateUtil.sort)
            .slice(newResults.length - 365, newResults.length -1);
    }
}