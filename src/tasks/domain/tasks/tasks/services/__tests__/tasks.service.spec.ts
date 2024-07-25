import { Model } from "mongoose";
import { TasksService } from "../tasks.service";
import { TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { Task } from "src/types";
import { DateTimeDto } from "src/tasks/application/dtos/update-task/date-time.dto";
import { RandomUtils } from "src/utils/random-utils";
import { StringUtil } from "src/utils/string-util";
import { DateUtil } from "src/utils/date-util";
import { FilterUtil } from "src/utils/filter-util";

describe('server/src/tasks/services/__tests__/tasks.service.spec.ts', () => {
    describe('taskService', () => {
        let randomUtils;
        let target: TasksService;
        let modelMock: Model<TaskDocument>;

        beforeEach(async () => {
            modelMock = Model<TaskDocument> = jest.fn() as unknown as Model<TaskDocument>;
            const stringUtil = new StringUtil();
            target = new TasksService(modelMock, stringUtil, new FilterUtil(stringUtil), new DateUtil());
            randomUtils = new RandomUtils();
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

        describe('#updateDateTimeOfTask', () => {
            it("should replace the dateTime based on dto's id", async () => {
                // Arrange
                const taskId = randomUtils.randomString();
                const dto: DateTimeDto = {
                    _id: randomUtils.randomString(),
                    date: '12-13-2024',
                    time: "22"
                };
                const task = {
                    _id: taskId,
                    tags: [randomUtils.randomString()],
                    date: '12-13-2024',
                    time: [{
                        _id: dto._id,
                        date: '12-13-2024',
                        time: 40
                    },
                    {
                        _id: randomUtils.randomString(),
                        date: '12-12-2024',
                        time: 24
                    }],
                    save() {
                        return this;
                    }
                };

                const expected = {
                    _id: dto._id,
                    date: '12-13-2024',
                    time: 1320000
                };
                const expectedTask = { ...task };
                expectedTask.time[0] = expected;


                modelMock.findOne = jest.fn().mockImplementationOnce(() => task);

                // Act
                const actual = await target.updateDateTimeOfTask(taskId, dto);

                // Assert
                expect(modelMock.findOne).toHaveBeenNthCalledWith(1, {_id: taskId});
                expect(actual).toEqual(expectedTask);
                expect(actual.time.find(item => item._id === dto._id)).toEqual(expected)
            });

            it("should throw NotFoundException, when task does not exist in db", async () => {
                // Arrange
                const taskId = randomUtils.randomString();
                const dto: DateTimeDto = {
                    _id: randomUtils.randomString(),
                    date: '12-13-2024',
                    time: "22"
                };
                const task = {
                    tags: [randomUtils.randomString()],
                    date: '12-13-2024',
                    time: [{
                        _id: dto._id,
                        date: '12-13-2024',
                        time: 40
                    },
                    {
                        _id: randomUtils.randomString(),
                        date: '12-12-2024',
                        time: 24
                    }],
                    save() {
                        return this;
                    }
                };

                const expected = {
                    _id: dto._id,
                    date: '12-13-2024',
                    time: 1320000
                };
                const expectedTask = { ...task };
                expectedTask.time[0] = expected;

                modelMock.findOne = jest.fn().mockImplementationOnce(() => null);

                // Act
                await expect(target.updateDateTimeOfTask(taskId, dto)).rejects.toThrow("task not found");

                // Assert
                expect(modelMock.findOne).toHaveBeenNthCalledWith(1, {_id: taskId});
            });
        });
    });
});