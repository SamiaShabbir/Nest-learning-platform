import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './Category.schema';
import { User } from './User.schama';
import { Blog } from './Blog.schema';
import { Course } from './Course.schema';
import { Lesson } from './Lesson.schema';
@Schema()
export class SubCategory {
  @Prop({required:true})
  title: string;
  
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category_id: Category;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]})
  blog: Blog[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]})
  course: Course[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]})
  lesson: Lesson[];
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
