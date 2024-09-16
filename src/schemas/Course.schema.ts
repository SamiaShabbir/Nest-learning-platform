import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { CourseLike } from './CourseLike.schema';
import { Lesson } from './Lesson.schema';
import { Category } from './Category.schema';
import { SubCategory } from './SubCategory';
@Schema()
export class Course {
  _id: string;  
  
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

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cateogory' }]})
  category: Category;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCateogory' }]})
  sub_category: SubCategory[];

}
export const CourseSchema = SchemaFactory.createForClass(Course);
