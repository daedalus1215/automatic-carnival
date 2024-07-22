import { DateUtil } from "../date-util";

describe('server/src/utils/__tests__/date-util.spec.ts', () => {
    describe('DateUtil', () => {
        const target = new DateUtil();
        describe('#getDate', () => {
            it('should should return the date correctly', () => {
                // Arrange
                const date = new Date('2023-08-30');
                const expected = '2023-08-30';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return leapday when it is leap year', () => {
                // Arrange
                const date = new Date('2020-02-29');
                const expected = '2020-02-29';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return correct date when giving ISO 8601 format', () => {
                // Arrange
                const date = new Date('2020-03-31T00:00:00.000Z');

                const expected = '2020-03-31';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });

            // @TODO: What is going on in this scenario, because this is what is causing the bad date
            it('should not be 8/31, some reason it is translating to 8/31. This is also an issue on the front end sending up', () => {
                // Arrange
                const august31 = '2023-09-01T04:05:48.202Z'
                const date = new Date(august31);
                const expected = '2023-09-01';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return march for day after leap day (not a real date for the month)', () => {
                // Arrange
                const date = new Date('2020-02-30');
                const expected = '2020-03-01';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });
            it('should return 2023-09-09', () => {
                // Arrange
                const date = new Date('2023-09-09T12:54:46.595Z');
                const expected = '2023-09-09';

                // Act
                const actual = target.getDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('#getMonthDate', () => {
            it('should return correct month and year', () => {
                // Arrange
                const date = new Date('2023-08-31');
                const expected = '2023-08';

                // Act
                const actual = target.getMonthDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return february on leap day', () => {
                // Arrange
                const date = new Date('2020-02-29');
                const expected = '2020-02';

                // Act
                const actual = target.getMonthDate(date);

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('#formatDate', () => {
            it('should be equal to 2023-02-01', () => {
                // Arrange
                const date = new Date("2023-02-02T01:00:00.000Z");

                // Act
                const actual = target.formatDate(date);

                // Assert
                expect(actual).toEqual("2023-02-01");
            });
            it('should be equal to 2023-02-02', () => {
                // Arrange
                const date = new Date("2023-02-02T12:00:00.000Z");

                // Act
                const actual = target.formatDate(date);

                // Assert
                expect(actual).toEqual("2023-02-02");
            });
        });

        describe('#compareFormattedDate', () => {
            it('should be true, with a equal date and day', () => {
                // Arrange
                const date = new Date('2023-02-02T12:00:00.000Z');
                const day = "2023-02-02";

                // Act
                const actual = target.compareFormattedDate(date, day);

                // Assert
                expect(actual).toBe(true);
            });
            it('should be false, with a unequal date and day', () => {
                // Arrange
                const date = new Date('2023-02-01T12:00:00.000Z');
                const day = "2023-02-02";

                // Act
                const actual = target.compareFormattedDate(date, day);

                // Assert
                expect(actual).not.toBe(true);
            });
        });
        describe('#getCurrentDate', () => {
            it('should return currentDate in ISO standard, if no date provided', () => {
                // Arrange
                const expected = new Date();

                // Act
                const actual = target.getDateInISOFormat();

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return date in ISO standard, if date provided', () => {
                // Arrange
                const date = "2023-02-02"
                const expected = "2023-02-02T00:00:00.000Z";

                // Act
                const actual = target.getDateInISOFormat(date);

                // Assert
                expect(actual.toISOString()).toEqual(expected);
            });

            it('should return currentDate in ISO standard, if date provided but equals "null"', () => {
                // Arrange
                const expected = new Date();

                // Act
                const actual = target.getDateInISOFormat("null");

                // Assert
                expect(actual).toEqual(expected);
            });
        });
        describe('#getRangeOfDates', () => {
            it('should return week ', () => {
                // Arrange
                const date = new Date('2023-09-29T00:00:00');
                const expected = [
                    '2023-09-29',
                    '2023-09-28',
                    '2023-09-27',
                    '2023-09-26',
                    '2023-09-25',
                    '2023-09-24',
                    '2023-09-23',
                    '2023-09-22',
                    '2023-09-21',
                    '2023-09-20',
                ];

                // Act
                const actual = target.getRangeOfDates(date, 10);

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('#isEvenOrGreaterThan', () => {
            it('should return true, if the first date is larger than the second date', () => {
                // Arrange & Act
                const actual = target.isEvenOrGreaterThan(new Date("2023-09-26T00:00:00.000Z"), new Date("2023-09-25T00:00:00.000Z"));

                // Assert
                expect(actual).toEqual(true);
            });
            it('should return true, if the dates are the same', () => {
                // Arrange & Act
                const actual = target.isEvenOrGreaterThan(new Date("2023-09-26T00:00:00.000Z"), new Date("2023-09-26T00:00:00.000Z"));

                // Assert
                expect(actual).toEqual(true);
            });
            it('should return false if the first date is below second date', () => {
                // Arrange & Act
                const actual = target.isEvenOrGreaterThan(new Date("2023-09-25T00:00:00.000Z"), new Date("2023-09-26T00:00:00.000Z"));

                // Assert
                expect(actual).toEqual(false);
            });
            it('should return false if the first date is below second date', () => {
                // Arrange & Act
                const actual = target.isEvenOrGreaterThan(new Date("2023-10-01T13:35:49.536Z"), new Date("2023-10-02T13:28:40.791Z"));

                // Assert 
                expect(actual).toEqual(false);
            });

            describe("string date", () => {
                it('should return true, if the first date is larger than the second date', () => {
                    // Arrange & Act
                    const actual = target.isEvenOrGreaterThan("2023-09-26", "2023-09-25");

                    // Assert
                    expect(actual).toEqual(true);
                });
                it('should return true, if the dates are the same', () => {
                    // Arrange & Act
                    const actual = target.isEvenOrGreaterThan("2023-09-26", "2023-09-26");

                    // Assert
                    expect(actual).toEqual(true);
                });
                it('should return false if the first date is below second date', () => {
                    // Arrange & Act
                    const actual = target.isEvenOrGreaterThan("2023-09-25T", "2023-09-26");

                    // Assert
                    expect(actual).toEqual(false);
                });
                it('should return false if the first date is below second date', () => {
                    // Arrange & Act
                    const actual = target.isEvenOrGreaterThan("2023-10-01", "2023-10-02");

                    // Assert 
                    expect(actual).toEqual(false);
                });
            });
        });

        describe('#minutesToMilliseconds', () => {
            describe('minutesToMilliseconds', () => {
                describe('minutes, with empty seconds', () => {
                    it('should return expected milliseconds', () => {
                        // Arrange
                        const expected = 3600000;
                        // Act
                        const actual = target.minutesToMilliseconds('60:00');

                        // Assert
                        expect(actual).toEqual(expected);
                    });
                });

                describe('minutes, with no seconds', () => {
                    it('should return expected milliseconds', () => {
                        // Arrange
                        const expected = 3600000;
                        // Act
                        const actual = target.minutesToMilliseconds('60');

                        // Assert
                        expect(actual).toEqual(expected);
                    });
                });

                describe('minutes, with seconds', () => {
                    it('should return expected milliseconds', () => {
                        // Arrange
                        const expected = 3659000;

                        // Act
                        const actual = target.minutesToMilliseconds('60:59');

                        // Assert
                        expect(actual).toEqual(expected);
                    });
                });
            });
        });


    });
});