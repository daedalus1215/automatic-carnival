import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TagEntity } from "src/tags/domain/entities/tag.entity";
import { ObjectId } from "typeorm";

export type TagDocument = Tag & Document;

@Schema()
export class Tag implements TagEntity {
    @Prop({ alias: "_id", type: ObjectId })
    id: string;

    @Prop({ trim: true })
    description: string;

    @Prop({ trim: true })
    name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag)