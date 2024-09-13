import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateCategory } from '../dto/create-category.dto';
import { Category } from 'src/schemas/Category.schema';

export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>) {}
  
    async create(createcategoryDto:CreateCategory):Promise<Category>
    {
      const createNew= await new this.categoryModel(createcategoryDto);
      return createNew.save();
    }

    async get():Promise<Category[]>{
        return await this.categoryModel.find().populate(['user_id','sub_categories']);
    }

    async getById(catId):Promise<Category>{
      return await this.categoryModel.findById(catId).populate(['user_id','sub_categories']);
    }

    async updateCategory(catId:any,subcatId:any):Promise<Category>{
       console.log("subcatId",subcatId);     
        return await this.categoryModel.findByIdAndUpdate(catId,
            { $addToSet: { sub_categories: subcatId}})
    }

    async update(catId:any,createcategoryDto:CreateCategory){
        return await this.categoryModel.findByIdAndUpdate(catId,createcategoryDto)
    }
}