import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { TaskDocument } from "src/tasks/infrastructure/schema/task/task.schema";
import { Task } from "src/types";
import striptags from 'striptags';

type parseArrayType = (names: string | string[]) => string[];
type getTitleType = (task: Task) => string;
type truncateStringType = (str: string, maxLength: number) => string;

@Injectable()
export class StringUtil {
    constructor() { }

    truncateString: truncateStringType = (str: string, maxLength: number) => {
        if (str?.length > maxLength) {

            return (str.substr(0, maxLength)).trim() + "...";
        }
        return str;
    }

    parseArrayString: parseArrayType = (names) => {
        if (typeof names === 'string' && names.includes(',')) {
            return names.split(',').map(name => name.trim());
        } else if (typeof names === 'string') {
            return [names];
        } else if (Array.isArray(names)) {
            return names;
        }
        return [];
    }

    getTitle: getTitleType = (task) => {
        return task?.title
            ?? (task?.description
                ? striptags(task.description.split("</p>")[0]?.split("<p>")[1])
                : '');
    }

    /**
     * 
     * @param model Model<TaskDocument>
     * @param predicates { includeTags?: string, excludeTags?: string }
     * @returns 
     */
    async getTaskBasedOnTags(model: Model<TaskDocument>, predicates?: { includeTags?: string, excludeTags?: string }) {
        if (!predicates)  {
            return await model.find();
        }

        const { includeTags, excludeTags } = predicates;

        if (includeTags) {
            return await model.find({ tags: { $in: includeTags } });
        } else if (excludeTags) {
            return await model.find({ tags: { $nin: excludeTags } });
        }
        
        return await model.find();
    };
}