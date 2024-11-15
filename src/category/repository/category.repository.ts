import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateCategory } from '../dto/create-category.dto';
import { Category } from 'src/schemas/Category.schema';
import { UpdateCategory } from '../dto/update-category.dto';

export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>) {}
  
    async create(createcategoryDto:CreateCategory):Promise<Category>
    {
      
      const createNew= await new this.categoryModel(createcategoryDto);
      return createNew.save();
    }

    async get():Promise<Category[]>{
        return await this.categoryModel.find({status:"approved"}).populate(['user_id']);
    }

   async getForAdmin():Promise<Category[]>{
      return await this.categoryModel.find().populate(['user_id']);
   }

    async updatePosts(catId:any,postId:string,type:string):Promise<Category>{
      if(type=='lesson'){
       return this.categoryModel.findByIdAndUpdate(catId,{
        $addToSet: { lesson: postId}});
      }else if(type=='blog'){
        return this.categoryModel.findByIdAndUpdate(catId,{
          $addToSet: { blog: postId}});
      }else if(type=='course'){
        return this.categoryModel.findByIdAndUpdate(catId,{
          $addToSet: { course: postId}});
      }else{
        return null;
      }
    }

    async getById(catId):Promise<Category>{
      return await this.categoryModel.findById(catId).populate(['user_id','sub_categories']);
    }

    async updateCategory(catId:any,subcatId:any):Promise<Category>{
       console.log("subcatId",subcatId);     
        return await this.categoryModel.findByIdAndUpdate(catId,
            { $addToSet: { sub_categories: subcatId}})
    }

    async update(catId:any,createcategoryDto:UpdateCategory){
        return await this.categoryModel.findByIdAndUpdate(catId,createcategoryDto)
    }

    async delete(catId:string):Promise<Boolean>{
      return await this.categoryModel.findByIdAndDelete(catId);
    }
}