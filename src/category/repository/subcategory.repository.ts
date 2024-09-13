import { CreateSubCategory } from './../dto/create-subcategory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from '../../schemas/SubCategory';

export class SubCategoryRepository {
  constructor(
    @InjectModel(SubCategory.name) private subcategoryModel: Model<SubCategory>) {}
  
    async create(createsubcategoryDto:CreateSubCategory):Promise<SubCategory>
    {
      const createNew= await new this.subcategoryModel(createsubcategoryDto);
      return createNew.save();
    }

    async get():Promise<SubCategory[]>{
        return await this.subcategoryModel.find().populate(['user_id','sub_categories']);
    }

    async getById(catId):Promise<SubCategory>{
      return await this.subcategoryModel.findById(catId).populate(['user_id','sub_categories']);
    }

    async updateCategory(catId:any,subcatId:any):Promise<SubCategory>{
        return await this.subcategoryModel.findByIdAndUpdate(catId,
            { $addToSet: { sub_categories: subcatId}})
    }

    async update(catId:any,createsubcategoryDto:CreateSubCategory){
        return await this.subcategoryModel.findByIdAndUpdate(catId,createsubcategoryDto)
    }
}