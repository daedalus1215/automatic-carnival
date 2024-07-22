import { Controller, Get, Query } from "@nestjs/common";
import { ActivityService } from "../../../domain/services/activity.service";

@Controller('activities')
export class ActivityController {
    constructor(private activityService: ActivityService) { }

    @Get('/today')
    async fetchTodaysActivity(@Query('date') date: string, @Query('includeTags') includeTags: string[], @Query(' excludeTags') excludeTags: string[]) {
        return this.activityService.fetchTodaysActivity(date, includeTags, excludeTags);
    }

    @Get('/all')
    async getTodaysActivity(@Query('includeTags') includeTags: string[], @Query(' excludeTags') excludeTags: string[]) {
        return this.activityService.fetchAllDayTasks(includeTags, excludeTags);
    }

    @Get('/months')
    async fetchAllMonthTasks(@Query('includeTags') includeTags: string[], @Query(' excludeTags') excludeTags: string[]) {
        return await this.activityService.fetchTasksForAllMonths(includeTags, excludeTags);
    }

    @Get('/stack-graph')
    async statsForRangeOfDates(@Query('date') date?: Date, @Query('days') days?: number, @Query('predicates') predicates?: { includeTags?: string, excludeTags?: string }) {
        return await this.activityService.fetchStats(date, days, predicates);
    }

}