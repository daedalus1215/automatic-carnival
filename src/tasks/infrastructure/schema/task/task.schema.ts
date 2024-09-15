import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { TimeVO } from './time.vo'
import { ObjectId } from 'typeorm'
import mongoose from 'mongoose'

export type TaskDocument = Task & Document

@Schema()
export class Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, alias: '_id', default: () => new mongoose.Types.ObjectId() })
  id: string

  @Prop()
  tags: string[]

  @Prop({ trim: true })
  description: string

  @Prop({ required: true })
  date: string

  @Prop({ trim: true })
  title: string

  @Prop()
  time: TimeVO[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
