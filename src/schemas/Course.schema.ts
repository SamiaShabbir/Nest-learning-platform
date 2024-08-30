import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { CourseLike } from './CourseLike.schema';
import { Lesson } from './Lesson.schema';
@Schema()
export class Course {
  @Prop({required:true})
  title: string;

  @Prop({required:false})
  description: string;
  
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({default:0})
  likeCount: number;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseLike' }]})
  likes: CourseLike[];

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]})
  lessons:Lesson[];

  }
export const CourseSchema = SchemaFactory.createForClass(Course);
