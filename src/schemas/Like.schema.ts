import mongoose, { Schema, Document } from 'mongoose';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schama';

@MongooseSchema({discriminatorKey:'type'})
export class Like extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
