import { Injectable } from '@nestjs/common';
import { SubCategoryRepository } from './repository/subcategory.repository';
import { CreateSubCategory } from './dto/create-subcategory.dto';

@Injectable()
export class SubcategoryService {
    constructor(private subcategoryRepository:SubCategoryRepository){}

    async create(createsubcategory:CreateSubCategory){
     const createSubcategory=await this.subcategoryRepository.create(createsubcategory);
     
    }
}
