import { Schema, Document } from 'mongoose';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { Blog } from './Blog.schema';
import mongoose from 'mongoose';

@MongooseSchema()
export class CousreLike {
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'})
  type_id:Blog;
}

export const CousreLikeSchema = SchemaFactory.createForClass(CousreLike);
