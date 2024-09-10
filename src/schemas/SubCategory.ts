import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './Category.schema';
import { User } from './User.schama';
@Schema()
export class SubCategory {
  @Prop({required:true})
  title: string;
  
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User;

  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category_id: Category;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
