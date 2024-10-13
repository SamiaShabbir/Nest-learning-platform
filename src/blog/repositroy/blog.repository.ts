import { Blog } from '../../schemas/Blog.schema';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateBlog } from '../dto/CreateBlog.dto';
import { Types } from 'mongoose';

export class BlogRepository {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>) {}
  
    async create(createblogDto:CreateBlog):Promise<Blog>
    {

      const createNew= await new this.blogModel(createblogDto);
       

  //     for (const subcategory of createblogDto.subArraycategory) {
  //       console.log('subcategory:',subcategory);

  //       let newsubcategory=new Types.ObjectId(subcategory);
  //      const data= await this.blogModel.findByIdAndUpdate(
  //     createNew._id,
  //     { $addToSet: { sub_category: newsubcategory } },
  //     { new: true }
  //     ).exec();

  // }
  return await createNew.save();;

      }

    async get(userId: string): Promise<Blog[]> {
      return await this.blogModel.find({ user_id:userId }).populate(['user_id','likes','category']);
    }

    async getById(blogId: string): Promise<Blog> {
      return await this.blogModel.findById(blogId).populate(['user_id','likes','category']);
    }

    async getAll():Promise<Blog[]>{
      return await this.blogModel.find({status:1}).populate(['user_id','category']).populate({path: 'likes',
        populate: {
          path: 'userId',
          select: 'first_name last_name username email',
        },});
    }

    async update(blogId:string,data:CreateBlog): Promise<Blog>{
      const updateblog=await this.blogModel.findByIdAndUpdate(blogId,data,{new:true});
      return updateblog;
    }

    async delete(blogId:string): Promise<Boolean>{
      return await this.blogModel.findByIdAndDelete(blogId);
    }
    async updateLike(blogId:string,likeId:string): Promise<Blog>{
      return await this.blogModel.findByIdAndUpdate(
        blogId,
        { $addToSet: { likes: likeId},
        $inc: { likeCount: 1 } 
        },  
        { new: true }
      )
    }

    async all():Promise<Blog[]>{
      return await this.blogModel.find().populate(['user_id','likes','category']);
    }

    async deletebyUserId(userId:string):Promise<any>{
      return await this.blogModel.deleteMany({user_id:userId});
    }
}