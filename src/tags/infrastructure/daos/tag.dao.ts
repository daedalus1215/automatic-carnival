import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "../schema/tag.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { TagRepository } from "src/tags/domain/ports/repositories/tag.repository";
import { TagEntity } from "src/tags/domain/entities/tag.entity";
import { tagDto } from "src/tags/domain/ports/dtos/tag.dto";

@Injectable()
export class TagDAO implements TagRepository {
    constructor(@InjectModel(Tag.name) private model: Model<TagDocument>) { }

    async findAll(): Promise<TagEntity[]> {
        return await this.model.find();
    }

    async findOne(id?: string): Promise<TagEntity> {
        return await this.model.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const res = await this.model.deleteOne({ _id: id });
        if (res.deletedCount > 0) {
            return true;
        }

        return false;
    }

    async deleteAll(): Promise<boolean> {
        const res = await this.model.deleteMany({});
        if (res.deletedCount > 0) {
            return true;
        }

        return false;
    }

    async create(): Promise<TagEntity> {
        const tag = await this.model.create({
            description: 'temp description',
            name: 'temp name'
        });
        return await tag.save();
    }

    async import({ name, description }: tagDto): Promise<TagEntity> {
        const tag = await this.model.create({
            description,
            name,
        });
        return await tag.save();
    }

    async update({ id, description, name }: tagDto) {
        const tag = await this.model.findById(id);
        tag.name = name;
        tag.description = description;
        return await tag.save();
    }
}