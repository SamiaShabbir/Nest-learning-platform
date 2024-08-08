import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from './Role.schema';
import {Token} from "./Token.schema";

@Schema()
export class User {
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
}
export const UserSchema = SchemaFactory.createForClass(User);
