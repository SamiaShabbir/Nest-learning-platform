import { Schema, Document } from 'mongoose';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';

@MongooseSchema()
export class Like extends Document {
  @Prop({ type: Schema.Types.ObjectId, required: true })
  userId: Schema.Types.ObjectId;  // User who liked the post

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
