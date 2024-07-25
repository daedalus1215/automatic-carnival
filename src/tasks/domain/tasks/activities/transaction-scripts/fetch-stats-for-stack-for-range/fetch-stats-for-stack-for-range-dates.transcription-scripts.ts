import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { DateUtil } from "src/utils/date-util";
import { StringUtil } from "src/utils/string-util";
import { faker } from '@faker-js/faker';
import { Injectable } from "@nestjs/common";

@Injectable()
export class FetchStatsForStackForRangeOfDates {
    constructor(
        @InjectModel(Task.name) private readonly model:Model<TaskDocument>,
        private readonly dateUtil:DateUtil, 
        private readonly stringUtil:StringUtil) {}

    async apply(date: Date, days: number, predicates?: { includeTags?: string, excludeTags?: string }) {
        const dates = this.dateUtil.getRangeOfDates(date, days);
        const tasks = await this.stringUtil.getTaskBasedOnTags(this.model, predicates);
        let datasets = [];
        for (let task of tasks) {
            const dataset = {
                label: this.stringUtil.getTitle(task),
                data: Array(days).fill(0),
                backgroundColor: `rgb(${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })})`
            };

            for (let time of task.time) {
                const currentDate = this.dateUtil.formatDate(time.date);
                if (currentDate === null || currentDate < dates[dates.length - 1]) {
                    continue;
                }

                let index = dates.findIndex(item => {
                    return item === currentDate;
                });
                if (index !== -1) {
                    if (dataset.data[index] >= 0) {
                        dataset.data[index] = dataset.data[index] + (time?.time / 1000 / 60 ?? 0)
                    } else {
                        dataset.data[index] = (time?.time / 1000 / 60 ?? 0)
                    }
                }
            }

            if (dataset.data.find(data => data > 0)) {
                datasets.push(dataset);
            }
        }

        return {
            data: {
                labels: dates,
                datasets
            },
            options: {
                "plugins": {
                    "title": {
                        "display": true,
                        "text": `Stacked Activity over ${days} days`
                    }
                },
                "responsive": true,
                "scales": {
                    "x": {
                        "stacked": true
                    },
                    "y": {
                        "stacked": true
                    }
                }
            }
        }
    }
}