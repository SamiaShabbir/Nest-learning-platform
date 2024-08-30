import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';

@Schema()
export class Token {
  @Prop({ required: true })
  token: string;
  
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

