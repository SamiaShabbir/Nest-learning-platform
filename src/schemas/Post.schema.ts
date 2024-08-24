import { Schema, model, Document } from 'mongoose';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';

@MongooseSchema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Like' }] })
  likes: Schema.Types.ObjectId[];  // Reference to likes
}

export const PostSchema = SchemaFactory.createForClass(Post);
