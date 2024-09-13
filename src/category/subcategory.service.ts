import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SubCategoryRepository } from './repository/subcategory.repository';
import { CreateSubCategory } from './dto/create-subcategory.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class SubcategoryService {
    constructor(private subcategoryRepository:SubCategoryRepository,
                private categoryRepository:CategoryRepository
    ){}

    async create(createsubcategory:CreateSubCategory){
        const checkCategory=await this.categoryRepository.getById(createsubcategory.category_id);
        if(!checkCategory){
            throw new NotFoundException('category id is not found');
        }
        const userobject=checkCategory.user_id;
        if(userobject._id!=createsubcategory.user_id){
           throw new ForbiddenException("U Don't have permission to do this action");
        }

        const createdSubcategory=await this.subcategoryRepository.create(createsubcategory);
        console.log(createdSubcategory,"createdSubcategory");
        await this.categoryRepository.updateCategory(createdSubcategory.category_id,createdSubcategory);     
        return createdSubcategory;
    }

    async get(){
        return await this.subcategoryRepository.get();
    }

    async getById(subcatId:string){
        return await this.subcategoryRepository.getById(subcatId);
     }
 
     async update(id:string,createsubcategoryDto:CreateSubCategory){
         return await this.subcategoryRepository.update(id,createsubcategoryDto);
     }
}
