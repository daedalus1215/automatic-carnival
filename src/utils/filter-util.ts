import { Task } from "src/types";
import { StringUtil } from "./string-util";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FilterUtil {

    constructor(private readonly stringUtil: StringUtil) { }

    inclusiveFilter(tasks: Task[], tagNames?: string[] | string): Task[] {
        if (tagNames && tagNames !== "null") {
            const tags = this.stringUtil.parseArrayString(tagNames);
            return tasks.filter(task => tags.some(tag => task.tags.includes(tag)));
        }
        return tasks;
    }

    exclusiveFilter(tasks: Task[], tagNames?: string[] | string): Task[] {
        if (tagNames && tagNames !== "null") {
            const tags = this.stringUtil.parseArrayString(tagNames);
            return tasks.filter(task => {
                return !tags.some(tag => task.tags.includes(tag));
            });
        }
        return tasks;
    };
}