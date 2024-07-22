import { Task } from "src/types";
import { FilterUtil } from "../filter-util";
import { StringUtil } from "../string-util";

describe('server/src/utils/__tests__/filter-util.spec.ts', () => {
    describe('FilterUtil', () => {
        //@TODO: Not mocking this atm, but this could lead to brittle testing
        const target = new FilterUtil(new StringUtil());

        describe('#inclusiveFilter', () => {
            it('should return back expected if tagNames equals "null"', () => {
                // Arrange
                const expected: Task[] = [{
                    id: "asdas",
                    tags: [],
                    description: "asdasddd",
                    date: "asdasd",
                    title: "asdasd",
                    time: []
                }];

                // Act
                const actual = target.inclusiveFilter(expected, "null");

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return back expected if tagNames equals null', () => {
                // Arrange
                const expected: Task[] = [{
                    id: "asdas",
                    tags: [],
                    description: "asdasddd",
                    date: "asdasd",
                    title: "asdasd",
                    time: []
                }];

                // Act
                const actual = target.inclusiveFilter(expected);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return tasks that do contain value in tagNames', () => {
                // Arrange
                const expected = [{
                    id: "1",
                    tags: ["name1"],
                    description: "das",
                    date: "05/12/2024",
                    title: "1",
                    time: []
                }, {
                    id: "3",
                    tags: ["name1", "name2"],
                    description: "das",
                    date: "05/12/2024",
                    title: "1",
                    time: []
                }];

                const tasks: Task[] = [
                    ...expected,
                    {
                        id: "2",
                        tags: ["name2"],
                        description: "dsa",
                        date: "05/12/2024",
                        title: "2",
                        time: []
                    }
                ];

                const tagNames = "name1"

                // Act
                const actual = target.inclusiveFilter(tasks, tagNames);

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('exclusiveFilter', () => {
            it('should return back expected if tagNames equals "null"', () => {
                // Arrange
                const expected: Task[] = [{
                    id: "",
                    tags: [],
                    description: "",
                    date: "",
                    title: "",
                    time: []
                }];

                // Act
                const actual = target.exclusiveFilter(expected, "null");

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return back expected if tagNames equals null', () => {
                // Arrange
                const expected: Task[] = [{
                    id: "",
                    tags: [],
                    description: "",
                    date: "",
                    title: "",
                    time: []
                }];

                // Act
                const actual = target.exclusiveFilter(expected);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return tasks that do not contain value in tagNames', () => {
                // Arrange
                const expected = [{
                    id: "1",
                    tags: ["name2", "name4"],
                    description: "das",
                    date: "05/12/2024",
                    title: "1",
                    time: []
                }];

                const tasks: Task[] = [
                    ...expected,
                    {
                        id: "2",
                        tags: ["name1"],
                        description: "dsa",
                        date: "05/12/2024",
                        title: "2",
                        time: []
                    }
                ];

                const tagNames = "name1"

                // Act
                const actual = target.exclusiveFilter(tasks, tagNames);

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
})