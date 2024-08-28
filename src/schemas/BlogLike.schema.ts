import { Schema, Document } from 'mongoose';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { Blog } from './Blog.schema';
import mongoose from 'mongoose';
import { Like } from './Like.schema';

@MongooseSchema()
export class BlogLike extends Like {  // Ensure BlogLike extends Like
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
    blogId: Blog;  // Rename the `type_id` field to something more descriptive
}

export const BlogLikeSchema = SchemaFactory.createForClass(BlogLike);
