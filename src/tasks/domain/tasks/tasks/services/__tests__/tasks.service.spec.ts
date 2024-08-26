import { Model } from "mongoose";
import { TasksService } from "../tasks.service";
import { TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { Task } from "src/types";
import { RandomUtils } from "src/utils/random-utils";
import { StringUtil } from '../../../../../../utils/string-util';
import { DateUtil } from '../../../../../../utils/date-util';
import { UpdateTaskDto } from "src/tasks/application/dtos/update-task/update-task.dto";
import { FetchAllTaskTitlesTS } from "../../transaction-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script";
import { CreateDateTimeOfTaskTS } from "../../transaction-scripts/create-date-time/create-date-time.transcription-script";
import { ImportTasksTS } from "../../transaction-scripts/import-tasks/import-tasks.transaction-script";
import { UpdateDateTime } from "../../transaction-scripts/update-date-time/update-date-time.transcription-script";
import { RemoveZeroTags } from "../../transaction-scripts/fix-tasks/remove-zero-tags.transaction-script";

describe('server/src/tasks/services/__tests__/tasks.service.spec.ts', () => {
    describe('taskService', () => {
        let randomUtils: RandomUtils;
        let target: TasksService;
        let modelMock: Model<TaskDocument>;
        let fetchAllTaskTitlesTSMock: FetchAllTaskTitlesTS;
        let createDateTimeOfTaskTSMock: CreateDateTimeOfTaskTS;
        let importTasksTSMock: ImportTasksTS;
        let updateDateTimeMock: UpdateDateTime;
        let removeZeroTagsMock: RemoveZeroTags;

        beforeEach(async () => {
            modelMock = jest.fn() as unknown as Model<TaskDocument>;
            fetchAllTaskTitlesTSMock = { apply: jest.fn() } as unknown as FetchAllTaskTitlesTS;
            createDateTimeOfTaskTSMock = { apply: jest.fn() } as unknown as CreateDateTimeOfTaskTS;
            importTasksTSMock = { apply: jest.fn() } as unknown as ImportTasksTS;
            updateDateTimeMock = { apply: jest.fn() } as unknown as UpdateDateTime;
            removeZeroTagsMock = { apply: jest.fn() } as unknown as RemoveZeroTags;
            randomUtils = new RandomUtils();

            target = new TasksService(
                modelMock,
                fetchAllTaskTitlesTSMock,
                createDateTimeOfTaskTSMock,
                importTasksTSMock,
                updateDateTimeMock,
                removeZeroTagsMock,
                new StringUtil(),
                new DateUtil()
            );
        });

        describe('#findAll', () => {
            it('should', () => {
                // Arrange
                modelMock.find = jest.fn();

                // Act
                target.findAll();

                // Assert
                expect(modelMock.find).toHaveBeenCalledTimes(1);
            });
        });

        describe('#findOne', () => {
            it('should call find single task by id, when id is present', async () => {
                // Arrange
                const expected: Task = {
                    id: "",
                    tags: [],
                    description: "",
                    date: "",
                    title: "",
                    time: []
                }
                const id = 'randomId';
                modelMock.findById = jest.fn().mockImplementationOnce(() => expected);

                // Act
                const actual = await target.findOne(id);

                // Assert
                expect(modelMock.findById).toHaveBeenNthCalledWith(1, id);
                expect(actual).toEqual(expected)
            });

            it('should throw new Error, when id is missing', async () => {
                // Arrange
                modelMock.findById = jest.fn();

                // Act & Assert
                await expect(target.findOne()).rejects.toThrow('Need id');
                expect(modelMock.findById).not.toHaveBeenCalled();
            });
        });

        describe('#update', () => {
            it('should updateTask with dto when dto is present', async () => {
                // Arrange
                const dto: UpdateTaskDto = {
                    date: randomUtils.randomString(),
                    dateTimes: [{
                        date: randomUtils.randomString(),
                        _id: randomUtils.randomString(),
                        time: randomUtils.randomString()
                    }],
                    description: randomUtils.randomString(),
                    tags: [],
                    taskId: randomUtils.randomString(),
                    time: randomUtils.randomNumber(),
                    title: randomUtils.randomString()
                };
                modelMock.updateOne = jest.fn().mockImplementationOnce(() => dto);


                // Act
                const actual = await target.update(dto);

                // Assert
                expect(actual).toEqual(dto);
            });

            it('should throw error, when dto is missing', async () => {
                // Arrange & Act & Assert
                await expect(target.update()).rejects.toThrow('dto');
            });
        });
    });
});