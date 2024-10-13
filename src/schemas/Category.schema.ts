import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { SubCategory } from './SubCategory';
import { Blog } from './Blog.schema';
import { Course } from './Course.schema';
import { Lesson } from './Lesson.schema';
@Schema()
export class Category {
  @Prop({required:true})
  title: string;
   
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({default:"pending"})
  status:string;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]})
  blog: Blog[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]})
  course: Course[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]})
  lesson: Lesson[];

  @Prop({default: Date.now})
  created_at:Date
}
export const CategorySchema = SchemaFactory.createForClass(Category);
