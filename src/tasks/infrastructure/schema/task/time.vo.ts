import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TimeVO {
    @Prop({ required: true})
    _id: string;

    @Prop()
    date: string;

    @Prop()
    time: number;
}

export const TimeVOSchema = SchemaFactory.createForClass(TimeVO);
