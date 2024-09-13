import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from './Course.schema';
import { Category } from './Category.schema';
import { SubCategory } from './SubCategory';
@Schema()
export class Lesson {
  @Prop({required:true})
  title: string;

  @Prop({required:false})
  description:string;

  @Prop({required:false})
  file:string;

  @Prop({required:false})
  video:string;

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref:'Course'})
  course: Course;

  @Prop({required:false,default:0})
  LikeCount: number;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cateogory' }]})
  category: Category;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCateogory' }]})
  sub_category: SubCategory[];
  }
export const LessonSchema = SchemaFactory.createForClass(Lesson);
