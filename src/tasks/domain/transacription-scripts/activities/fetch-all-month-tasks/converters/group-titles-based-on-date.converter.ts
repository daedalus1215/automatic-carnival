import { Injectable } from "@nestjs/common";
import { Task, groupTitlesBasedOnDate } from "src/types";
import { DateUtil } from "src/utils/date-util";

@Injectable()
export class GroupTitlesBasedOnDateConverter {
    constructor(private readonly dateUtil: DateUtil) {}

    /**
     * 
     * @param tasks Task[]
     * @returns {'12-12-24': {titles: ['task title 1 on this date', 'task title 2 on this date']}, '12-13-24': {titles: ['task title 1 on this date', 'task title 2 on this date']}}
     */
    apply(tasks: Task[]): groupTitlesBasedOnDate {
        const results = {};
        tasks.forEach(task => {
            task.time
                .filter(time => time?.date)
                .forEach(time => {
                    const theDate = this.dateUtil.formatMonth(time.date);

                    if (!results[theDate]) {
                        results[theDate] = { time: 0, titles: [] };
                    }

                    results[theDate].time += time.time;

                    const title = task?.title ?? 'no title';

                    if (results[theDate]?.titles.indexOf(title) === -1) {
                        results[theDate].titles.push(title);
                    }

                });
        });

        return results;
    }
}