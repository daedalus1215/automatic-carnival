import { Tag } from "../../infrastructure/schema/tag.schema";
import { Inject, Injectable } from "@nestjs/common";
import { TagRepository } from "../ports/repositories/tag.repository";
import { tagDto } from "../ports/dtos/tag.dto";
import { TagEntity } from "../entities/tag.entity";

@Injectable()
export class TagService {

    constructor(@Inject('TagRepository') private repository: TagRepository) { }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id?: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.repository.findOne(id);
    }

    async delete(id: string): Promise<any> {
        return await this.repository.delete(id);
    }

    async deleteAll(): Promise<any> {
        return await this.repository.deleteAll();
    }

    async create(): Promise<Tag> {
        return await this.repository.create();
    }

    async update(dto: tagDto): Promise<TagEntity> {
        return this.repository.update(dto);
    }

    importTags(tags: tagDto[]) {
        return tags.map(async tagDto => await this.repository.import(tagDto));
    }
}