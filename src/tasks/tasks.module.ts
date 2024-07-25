import { Module } from '@nestjs/common';
import { TasksController } from './application/controllers/tasks/tasks.controller';
import { TasksService } from './domain/tasks/tasks/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './infrastructure/schema/task/task.schema';
import { UtilModule } from 'src/utils/utils.module';
import { ActivityService } from './domain/tasks/activities/services/activity.service';
import { ActivityController } from './application/controllers/activity/activity.controller';
import { GroupTitlesBasedOnDateConverter } from './domain/tasks/activities/transaction-scripts/fetch-all-month-tasks/converters/group-titles-based-on-date.converter';
import { GroupTitlesFormatConverter } from './domain/tasks/activities/transaction-scripts/fetch-all-month-tasks/converters/group-titles-format.converter';
import { FetchAllTaskTitlesTS } from './domain/tasks/tasks/transaction-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTaskTS } from './domain/tasks/tasks/transaction-scripts/create-date-time/create-date-time.transcription-script';
import { UpdateDateTime } from './domain/tasks/tasks/transaction-scripts/update-date-time/update-date-time.transcription-script';
import { FetchStatsForStackForRangeOfDates } from './domain/tasks/activities/transaction-scripts/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts';
import { FetchAllMonthTasks } from './domain/tasks/activities/transaction-scripts/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { FetchTodaysTasks } from './domain/tasks/activities/transaction-scripts/fetch-todays-tasks/fetch-todays-tasks.transcription-script';
import { FetchTodaysActivities } from './domain/tasks/activities/transaction-scripts/fetch-todays-activities/fetch-todays-activities.transcription-script';
import { ImportTasksTS } from './domain/tasks/tasks/transaction-scripts/import-tasks/import-tasks.transaction-script';

@Module({
  controllers: [TasksController, ActivityController],
  providers: [
    // Services
    TasksService,
    ActivityService,

    // Converters
    GroupTitlesBasedOnDateConverter,
    GroupTitlesFormatConverter,

    // Transcription Scripts
    FetchAllTaskTitlesTS,
    CreateDateTimeOfTaskTS,
    UpdateDateTime,
    ImportTasksTS,

    // Activities TS
    FetchStatsForStackForRangeOfDates,
    FetchAllMonthTasks,
    FetchTodaysTasks,
    FetchTodaysActivities
  ],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UtilModule
  ]
})

export class TasksModule { }
