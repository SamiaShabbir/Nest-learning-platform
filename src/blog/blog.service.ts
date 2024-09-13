import { Injectable } from '@nestjs/common';
import { BlogRepository } from './repositroy/blog.repository';
import { CreateBlog } from './dto/CreateBlog.dto';
import { CreateLike } from 'src/like/dto/createLike.dto';
import { CategoryRepository } from '../category/repository/category.repository';
import { SubCategoryRepository } from 'src/category/repository/subcategory.repository';
@Injectable()
export class BlogService {
    constructor(private blogRepository:BlogRepository,
                private categoryRepository:CategoryRepository,
                private subcategoryRepository:SubCategoryRepository
    ){}

    async create(createblogDto:CreateBlog,userId:string)
    {
        createblogDto.user_id=userId;
        const createdBlog=await this.blogRepository.create(createblogDto);
        await this.categoryRepository.updatePosts(createdBlog.category,createdBlog._id,'blog');
        await this.subcategoryRepository.updatePosts(createdBlog.sub_category,createdBlog._id,'blog');
        return createdBlog;
    }

    async get(userId: string)
    {
        return await this.blogRepository.get(userId);
    }

    async getById(blogId:string){
        return await this.blogRepository.getById(blogId);
    }

    async GetAll(){
        return await this.blogRepository.getAll();
    }

    async update(blogId:string,data:CreateBlog){
       return await this.blogRepository.update(blogId,data);
    }

    async delete(blogId:string){
        return await this.blogRepository.delete(blogId);
    }

    async updateLike(blogId:string,likeId:string)
    {
        return await this.blogRepository.updateLike(blogId,likeId);
    }
}
