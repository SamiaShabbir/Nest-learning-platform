import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from './Role.schema';
import {Token} from "./Token.schema";

@Schema()
export class User {
  _id: string;
  @Prop({ required: true, unique: true })
  first_name: string;
  @Prop({ required: true, unique: true })
  last_name: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  DoB: Date;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role_id: Role;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true,default: 'false'  })
  IsloggedIn: boolean;
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'Token'})
  token_id: Token;
  @Prop({required:false, default:null})
  picture: string;
  @Prop({required:false, default:null})
  cv: string;
  @Prop({required:false, default:null})
  gender: string;
  @Prop({required:false, default:null})
  education_level: string;
  @Prop({required:false, default:null})
  specialization: string;
  @Prop({required:false, default:false})
  is_verified: boolean;
  @Prop({required:false, default:null})
  contact_number: number;
  @Prop({default: Date.now})
  created_at:Date
  
}
export const UserSchema = SchemaFactory.createForClass(User);
