import { Model } from "mongoose";
import { DateTimeDto } from "src/tasks/application/dtos/update-task/date-time.dto";
import { TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { RandomUtils } from "src/utils/random-utils";
import { UpdateDateTime } from "../update-date-time.transcription-script";
import { DateUtil } from "src/utils/date-util";
import { mock } from "node:test";

describe('update-date-time.transcription-script.ts', () => {
    let modelMock = jest.fn() as unknown as Model<TaskDocument>;
    let dateUtilMock = new DateUtil()
    let target: UpdateDateTime;

    const randomUtils = new RandomUtils();
    beforeEach(() => {
        target = new UpdateDateTime(modelMock, dateUtilMock);
    });

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

        const saveMock = jest.fn().mockImplementationOnce(() => task);
        task.save = saveMock;


        const expected = {
            _id: dto._id,
            date: '12-13-2024',
            time: 1320000
        };
        const expectedTask = { ...task };
        expectedTask.time[0] = expected;


        modelMock.findById = jest.fn().mockImplementationOnce(() => task);

        // Act
        const actual = await target.apply(taskId, dto);

        // Assert
        expect(modelMock.findById).toHaveBeenNthCalledWith(1, taskId);
        expect(actual).toEqual(expectedTask);
        expect(actual.time.find(item => item._id === dto._id)).toEqual(expected)
        expect(saveMock).toHaveBeenCalledTimes(1);
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
        await expect(target.apply(taskId, dto)).rejects.toThrow("task not found");
    });
});