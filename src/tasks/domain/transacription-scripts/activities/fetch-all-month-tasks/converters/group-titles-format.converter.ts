import { Injectable } from "@nestjs/common";
import { DateUtil } from "src/utils/date-util";

@Injectable()
export class GroupTitlesFormatConverter {
    constructor(private readonly dateUtil: DateUtil) { }
    
    apply(results) {
        const newResults = [];
        const keys = Object.keys(results);

        for (let key of keys) {
            newResults.push({
                date: key,
                ...results[key]
            })
        }

        return newResults
            .sort(this.dateUtil.sort);
    }
}