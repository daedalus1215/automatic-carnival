import { tagDto } from "../ports/dtos/tag.dto";
import { TagService } from "../services/tag.service";

export class TagAggregator {
    constructor(private tagService: TagService) { }

    async importTags(tags: tagDto[]) {
        return this.tagService.importTags(tags);
    }
}