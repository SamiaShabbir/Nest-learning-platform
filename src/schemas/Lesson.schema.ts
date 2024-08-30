import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from './Course.schema';
@Schema()
export class Lesson {
  @Prop({required:true})
  title: string;

  @Prop({required:false})
  description:string;

  @Prop({required:true})
  file:string;

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref:'Course'})
  course: Course;

  @Prop({required:true})
  LikeCount: number;

  }
export const LessonSchema = SchemaFactory.createForClass(Lesson);
