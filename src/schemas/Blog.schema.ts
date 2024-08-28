import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { BlogLike } from './BlogLike.schema';
@Schema()
export class Blog {
  @Prop({required:true})
  body: string; 
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;
  @Prop({ default: 0 })
  viewCount: number;
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'BlogLike'})
  likes:BlogLike;

}
export const BlogSchema = SchemaFactory.createForClass(Blog);
