import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { BlogLike } from './BlogLike.schema';
import { Category } from './Category.schema';
import { SubCategory } from './SubCategory';
@Schema()
export class Blog {
  _id: string;  

  @Prop({required:true})
  title: string; 

  @Prop({required:true})
  body: string; 

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  likeCount: number;
  
  @Prop({required:false})
  image: string;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogLike' }]})
  likes: BlogLike[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cateogory' }]})
  category: Category;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCateogory' }]})
  sub_category: SubCategory[];

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);