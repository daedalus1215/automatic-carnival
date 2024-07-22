import { Injectable } from "@nestjs/common";
import { FilterUtil } from "src/utils/filter-util";
import { GroupTitlesBasedOnDateConverter } from "./converters/group-titles-based-on-date.converter";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../../../../infrastructure/schema/task/task.schema";
import { Model } from "mongoose";
import { GroupTitlesFormatConverter } from "./converters/group-titles-format.converter";

//@TODO: Unit test this
@Injectable()
export class FetchAllMonthTasks {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly filterUtil: FilterUtil,
        private readonly groupTitlesBasedOnDateConverter: GroupTitlesBasedOnDateConverter,
        private readonly groupTitlesFormatConverter: GroupTitlesFormatConverter) { }

    async apply(includeTags?: string[], excludeTags?: string[]) {
        const tasks = await this.model.find();
        const tagsWithoutExcluded = this.filterUtil.exclusiveFilter(tasks.filter(task => !!task.date), excludeTags);
        const includedAndExcludedTags = this.filterUtil.inclusiveFilter(tagsWithoutExcluded, includeTags);
        const results = this.groupTitlesBasedOnDateConverter.apply(includedAndExcludedTags)
        return this.groupTitlesFormatConverter.apply(results);
    }
}