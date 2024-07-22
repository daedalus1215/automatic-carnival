import { Task } from "src/types";
import { StringUtil } from "../string-util";
import striptags from "striptags";
import { TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { Model } from "mongoose";

jest.mock('striptags', () => ({
    default: jest.fn().mockImplementation(() => "<p>this will be title</p> Other stuff here that won't get brought into title")
}));

describe('server/src/utils/__tests__/string-util.spec.ts', () => {
    describe('StringUtil', () => {
        let target = new StringUtil();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        describe('#truncateString', () => {
            it('should not truncate string when maxLength exceeds string length', () => {
                // Arrange

                // Act
                const actual = target.truncateString("a value", 3);

                // Assert
                expect(actual).toEqual('a v...')
            });

            it('should truncate string and add ellipses, when maxLength is smaller than string length', () => {
                // Arrange
                const aValue = "a value";

                // Act
                const actual = target.truncateString(aValue, 10);

                // Assert
                expect(actual).toEqual(aValue)
            });
        });

        describe('parseArrayString', () => {
            it('should return trimmed string in an array, when passed an a string that is an array', () => {
                // Arrange
                const names = 'name1, name2 ';
                const expected = ['name1', 'name2'];

                // Act
                const actual = target.parseArrayString(names);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return string in an array, when passed string', () => {
                // Arrange
                const names = 'name1';
                const expected = ['name1'];

                // Act
                const actual = target.parseArrayString(names);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return array, when passed an array', () => {
                // Arrange
                const expected = ['name1', 'name2'];

                // Act
                const actual = target.parseArrayString(expected);

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('#getTitle', () => {
            it('should return task title when it is on the task', () => {
                // Arrange
                const title = 'this will be title';

                const task: Task = {
                    id: "",
                    tags: [],
                    title: title,
                    description: `<p>not the title!</p> Other stuff here that won't get brought into title`,
                    date: "",
                    time: []
                };

                // Act
                const actual = target.getTitle(task);

                // Assert
                expect(striptags).not.toHaveBeenCalled();
                expect(actual).toEqual(title);
            });

            it('should return the first paragraph as title, when title does not exist on the task', () => {
                // Arrange
                const title = 'this will be title';

                const task: Task = {
                    id: "",
                    tags: [],
                    description: `<p>${title}</p> Other stuff here that won't get brought into title`,
                    date: "",
                    time: []
                };

                // Act
                const actual = target.getTitle(task);

                // Assert
                expect(striptags).toHaveBeenNthCalledWith(1, title);
                expect(actual).toEqual(task.description);
            });

            it('should return empty string when no title and no description exists on task', () => {
                // Arrange
                const task: Task = {
                    id: "",
                    tags: [],
                    date: "",
                    time: []
                };

                // Act
                const actual = target.getTitle(task);

                // Assert
                expect(striptags).not.toHaveBeenCalled();
                expect(actual).toEqual('');
            });
        });

        describe('#getTaskBasedOnTags', () => {
            it('should invoke find with no arguments, when predicate has null values for properties.', async () => {
                // Arrange
                const findSpy = jest.fn().mockImplementationOnce(() => ({}));

                const model: Model<TaskDocument> = {
                    find: findSpy
                } as any;

                // Act
                const actual = await target.getTaskBasedOnTags(model, { includeTags: null, excludeTags: null });

                // Assert
                expect(findSpy).toHaveBeenCalledTimes(1);
                expect(actual).toEqual({});
            });

            it('should invoke find with includeTags, when predicate has a value for includeTags property.', async () => {
                // Arrange
                const expectedTask: Task = {
                    id: "taskId",
                    tags: ['tagId'],
                    date: "2024-12-12",
                    time: []
                };
                const findSpy = jest.fn().mockImplementationOnce(() => expectedTask);
                const includeTags = 'includeTags';
                const expectedFilter = { "tags": { "$in": includeTags } };

                const model: Model<TaskDocument> = {
                    find: findSpy
                } as any;

                // Act
                const actual = await target.getTaskBasedOnTags(model, { includeTags, excludeTags: null });

                // Assert
                expect(findSpy).toHaveBeenNthCalledWith(1, expectedFilter);
                expect(actual).toEqual(expectedTask);
            });

            it('should invoke find with excludeTags, when predicate has no value for includeTags property, but has value for excludeTags.', async () => {
                // Arrange
                const expectedTask: Task = {
                    id: "taskId",
                    tags: ['tagId'],
                    date: "2024-12-12",
                    time: []
                };
                const findSpy = jest.fn().mockImplementationOnce(() => expectedTask);
                const excludeTags = 'excludeTags';
                const expectedFilter = { "tags": { "$nin": excludeTags } };

                const model: Model<TaskDocument> = {
                    find: findSpy
                } as any;

                // Act
                const actual = await target.getTaskBasedOnTags(model, { includeTags: null, excludeTags });

                // Assert
                expect(findSpy).toHaveBeenNthCalledWith(1, expectedFilter);
                expect(actual).toEqual(expectedTask);
            });
        });
    });
});