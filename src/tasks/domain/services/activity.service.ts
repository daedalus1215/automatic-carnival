import { Injectable } from "@nestjs/common";
import { FetchStatsForStackForRangeOfDates } from "../transacription-scripts/activities/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts";
import { FetchAllMonthTasks } from "../transacription-scripts/activities/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script";
import { FetchTodaysTasks } from "../transacription-scripts/activities/fetch-todays-tasks/fetch-todays-tasks.transcription-script";
import { FetchTodaysActivities } from "../transacription-scripts/activities/fetch-todays-activities/fetch-todays-activities.transcription-script";

@Injectable()
export class ActivityService {
    constructor(
        private readonly fetchStatsForStackForRangeOfDates: FetchStatsForStackForRangeOfDates,
        private readonly fetchAllMonthTasks: FetchAllMonthTasks,
        private readonly fetchTodaysTasks: FetchTodaysTasks,
        private readonly fetchTodaysActivities: FetchTodaysActivities
    ) { }

    // @TODO: Bring this back after we migrate to class utils
    async fetchStats(date: Date, days: number, predicates: { includeTags?: string, excludeTags?: string }) {
        return this.fetchStatsForStackForRangeOfDates.apply(date, days, predicates)
    }

    //@TODO: Unit test this
    fetchTasksForAllMonths(includeTags?: string[], excludeTags?: string[]) {
        return this.fetchAllMonthTasks.apply(includeTags, excludeTags);
    };

    fetchTodaysActivity(date: string, includeTags: string[], excludeTags: string[]) {
        return this.fetchTodaysTasks.apply(date, includeTags, excludeTags);
    }

    fetchAllDayTasks(includeTags: string[], excludeTags: string[]) {
        return this.fetchTodaysActivities.apply(includeTags, excludeTags);
    }
}