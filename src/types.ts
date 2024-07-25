export type Task = {
    id: string;
    tags: string[];
    description: string;
    date: string;
    title: string;
    time: Time[];
}

export class Time {
    _id: string;
    date: string;
    time: number;
}

export type groupTitlesBasedOnDate = {
    [key: string]: {
        titles: string[]
    }
}