import { Injectable } from '@nestjs/common';
import { differenceInDays, format, subDays } from 'date-fns';

const dateRegExp = /\d{4}-\d{2}-\d{2}/;
const monthRegExp = /\d{4}-\d{2}/;

@Injectable()
export class DateUtil {

    parseDate(date?: Date): string {
        if (!date) return null;
        return this.getDate(date).match(dateRegExp)[0]
    }
    getDate(date?: Date): string {
        if (!date) return null;
        const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
        return format(dtDateOnly, 'yyyy-MM-dd');
    };

    formatDate(date?: string | Date): string {
        if (date === undefined) return null;
        return format(date, 'yyyy-MM-dd').match(dateRegExp)[0];
    }

    formatMonth(date?: string): string {
        if (date === undefined) return null;
        return format(date, 'yyyy-MM-dd').match(monthRegExp)[0];
    }

    getMonthDate(date?: string | Date): string {
        if (date === undefined) return null;
        return format(date, 'yyyy-MM');
    };

    compareFormattedDate(date: string | Date, day: string): boolean {
        return this.formatDate(date) === day
    }
    /**
     * First date is the one we are checking if it is even or greater than.
     * @param {Date | String} date1 either a Date or a String in the format "yyyy-MM-DD"
     * @param {Date | String} date2 either a Date or a String in the format "yyyy-MM-DD"
     * @returns 
     */
    isEvenOrGreaterThan(date1: Date | string, date2: Date | string): boolean {
        const firstDate = date1 instanceof Date ? this.formatDate(date1) : date1;
        const secondDate = date2 instanceof Date ? this.formatDate(date2) : date2;
        return differenceInDays(new Date(firstDate), new Date(secondDate)) >= 0;
    };

    /**
     * With a date and an iteration, we know the range of dates to give.
     * @param {Date} date the date we start from, that we are going back from.
     * @param {number} days how far back we want to go
     * @returns 
     */
    getRangeOfDates(date: Date, days: number) {
        const dates = [];
        dates.push(this.formatDate(date));
        let tDate = date;
        for (let i = 1; i < days; i++) {
            tDate = subDays(tDate, 1);
            dates.push(this.formatDate(tDate))
        }
        return dates;
    };

    /**
     * 
     * @param String currentDate format yyyy-MM-dd
     * @returns Date
     */
    getDateInISOFormat(currentDate?: string): Date {
        return (!!currentDate && currentDate != "null")
            ? new Date(currentDate)
            : new Date();
    }

    /**
     * 
     * @param mins minutes in the format: "mm:ss" 
     */
    minutesToMilliseconds(mins: string): number {
        const [minutes, seconds] = mins.split(":");

        const minutesToMilliseconds = parseInt(minutes) * 1000 * 60;
        const secondsToMilliseconds = seconds ? (parseInt(seconds) * 1000) : 0;

        return minutesToMilliseconds + secondsToMilliseconds;
    }


    // @TODO: Unit Test this method
    sort(firstDate: any, secondDate: any) {
        return (new Date(firstDate.date).getUTCMilliseconds()) - (new Date(secondDate.date).getUTCMilliseconds())
    }

    // @TODO: Unit Test this method
    millisToMinutesAndSeconds(millis) {
        const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
        return `${Math.floor(millis / 60000)}:${(seconds < 10 ? "0" : "")}${seconds}`;
    };
}