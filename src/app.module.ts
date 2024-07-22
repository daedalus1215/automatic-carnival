import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { Task, TaskSchema } from './tasks/infrastructure/schema/task/task.schema';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return process.env.NODE_ENV === 'development' ?
          { uri: `mongodb://${configService.get<string>('DATABASE_HOST')}:${configService.get<string>('DATABASE_PORT')}/${configService.get<string>('DATABASE_NAME')}` }
          : {
            uri: `mongodb://${configService.get<string>('DATABASE_USER')}:${configService.get<string>('DATABASE_PASSWORD')}@${configService.get<string>('DATABASE_HOST')}:${configService.get<string>('DATABASE_PORT')}/${configService.get<string>('DATABASE_NAME')}`
          }
      },
      inject: [ConfigService],
    }),
    TasksModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
