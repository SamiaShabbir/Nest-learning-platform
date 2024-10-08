import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategory } from './dto/create-category.dto';
import { UpdateCategory } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository:CategoryRepository){}

    async create(createcategoryDto:CreateCategory){
        return await this.categoryRepository.create(createcategoryDto);
    }

    async get(){
        return await this.categoryRepository.get();
    }

    async getforAdmin(){
        return await this.categoryRepository.getForAdmin();
    }

    async getById(catId:string){
       return await this.categoryRepository.getById(catId);
    }

    async update(id:string,createcategoryDto:UpdateCategory){
        return await this.categoryRepository.update(id,createcategoryDto);
    }

    async delete(id:string){
        return await this.categoryRepository.delete(id);
    }
}

