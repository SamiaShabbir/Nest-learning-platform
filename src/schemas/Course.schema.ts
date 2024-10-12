import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { CourseLike } from './CourseLike.schema';
import { Lesson } from './Lesson.schema';
import { Category } from './Category.schema';
import { SubCategory } from './SubCategory';
import { Enrollment } from './Enrollement.schema';
@Schema()
export class Course {
  _id: string;  
  
  @Prop({required:true})
  title: string;

  @Prop({required:false})
  description: string;
  
  @Prop({required:false,default:1})
  status: number;

  @Prop({required:false,default:false})
  is_verified: boolean;

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({default:0})
  likeCount: number;

  @Prop({required:false})
  level:string;
  
  @Prop({required:true})
  no_of_lesson:number;

  @Prop({required:false})
  key_points:string;

  @Prop({required:false})
  image:string;

  @Prop({required:false})
  sub_category:[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseLike' }]})
  likes: CourseLike[];

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]})
  lessons:Lesson[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cateogory' }]})
  category: Category;
}
export const CourseSchema = SchemaFactory.createForClass(Course);
