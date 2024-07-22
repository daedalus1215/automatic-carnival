import { Module } from '@nestjs/common';
import { TasksController } from './application/controllers/tasks/tasks.controller';
import { TasksService } from './domain/services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './infrastructure/schema/task/task.schema';
import { UtilModule } from 'src/utils/utils.module';
import { FetchAllTaskTitles } from './domain/transacription-scripts/tasks/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from './domain/transacription-scripts/tasks/create-date-time.transcription-script/create-date-time.transcription-script';
import { FetchStatsForStackForRangeOfDates } from './domain/transacription-scripts/activities/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts';
import { UpdateDateTime } from './domain/transacription-scripts/tasks/update-date-time/update-date-time.transcription-script';
import { ActivityService } from './domain/services/activity.service';
import { ActivityController } from './application/controllers/activity/activity.controller';
import { FetchAllMonthTasks } from './domain/transacription-scripts/activities/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { GroupTitlesFormatConverter } from './domain/transacription-scripts/activities/fetch-all-month-tasks/converters/group-titles-format.converter';
import { GroupTitlesBasedOnDateConverter } from './domain/transacription-scripts/activities/fetch-all-month-tasks/converters/group-titles-based-on-date.converter';
import { FetchTodaysTasks } from './domain/transacription-scripts/activities/fetch-todays-tasks/fetch-todays-tasks.transcription-script';
import { FetchTodaysActivities } from './domain/transacription-scripts/activities/fetch-todays-activities/fetch-todays-activities.transcription-script';

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
    FetchAllTaskTitles,
    CreateDateTimeOfTask,
    UpdateDateTime,
    
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
