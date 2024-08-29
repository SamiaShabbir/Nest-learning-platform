import { Blog } from '../../schemas/Blog.schema';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateBlog } from '../dto/CreateBlog.dto';

export class BlogRepository {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>) {}
  
    async create(createblogDto:CreateBlog):Promise<Blog>
    {
      const createNew= await new this.blogModel(createblogDto);
      return createNew.save();
    }

    async get(userId: string): Promise<Blog[]> {
      return await this.blogModel.find({ user_id:userId }).populate(['user_id','likes']);
    }

    async getById(blogId: string): Promise<Blog[]> {
      return await this.blogModel.findById(blogId);
    }

    async getAll():Promise<Blog[]>{
      return await this.blogModel.find().populate(['user_id','likes']);
    }

    async update(blogId:string,data:CreateBlog): Promise<Blog>{
      const updateblog=await this.blogModel.findByIdAndUpdate(blogId,data,{new:true});
      // console.log("updateblog",updateblog);
      return updateblog;
    }

    async delete(blogId:string): Promise<Boolean>{
      return await this.blogModel.findByIdAndDelete(blogId);
    }
    async updateLike(blogId:string,likeId:string): Promise<Blog>{
      return await this.blogModel.findByIdAndUpdate(
        blogId,
        { $addToSet: { likes: likeId},
        $inc: { viewCount: 1 } 
        },  
        { new: true }
      )
    }
}