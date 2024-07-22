import { Task } from 'src/types';
import striptags from 'striptags';

type getTitleType = (task: Task) => string;

export const getTitle: getTitleType = (task) => task?.title
    ?? (task?.description
        ? striptags(task.description.split("</p>")[0]?.split("<p>")[1])
        : '');