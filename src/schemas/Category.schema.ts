import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { SubCategory } from './SubCategory';
@Schema()
export class Category {
  @Prop({required:true})
  title: string;
   
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]})
  sub_categories: SubCategory[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
