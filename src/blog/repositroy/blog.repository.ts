import { Blog } from '../../schemas/Blog.schema';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateBlog } from '../dto/CreateBlog.dto';

export class BlogRepository {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>) {}
  
    async create(createblogDto:CreateBlog):Promise<Blog>
    {
      console.log("createblogDto",createblogDto);
      const createNew= await new this.blogModel(createblogDto);
      console.log("createNew",createNew);
      return createNew.save();
    }

    async get(userId: string): Promise<Blog[]> {
      return await this.blogModel.find({ user_id:userId }).populate('user_id');
    }

    async getById(blogId: string): Promise<Blog[]> {
      return await this.blogModel.findById(blogId);
    }

}