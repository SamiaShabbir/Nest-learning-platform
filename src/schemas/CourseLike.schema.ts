import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Like } from './Like.schema';
import { Course } from './Course.schema';

@MongooseSchema()
export class CourseLike extends Like{

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course'})
  courseId:Course;
}

export const CousreLikeSchema = SchemaFactory.createForClass(CourseLike);
