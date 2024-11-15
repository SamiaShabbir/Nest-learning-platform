import { Injectable } from '@nestjs/common';
import { BlogRepository } from './repositroy/blog.repository';
import { CreateBlog } from './dto/CreateBlog.dto';
import { CreateLike } from 'src/like/dto/createLike.dto';
import { CategoryRepository } from '../category/repository/category.repository';
import { SubCategoryRepository } from 'src/category/repository/subcategory.repository';
import { convertStringsToObjectIds } from 'src/shared/utils/objectId.util';
import { UpdateBlog } from './dto/UpdateBlog.dto';
@Injectable()
export class BlogService {
    constructor(private blogRepository:BlogRepository,
                private categoryRepository:CategoryRepository,
                private subcategoryRepository:SubCategoryRepository
    ){}

    async create(createblogDto:CreateBlog,userId:string)
    {
        console.log("createblogDto",createblogDto);
        // const subCategoryIdsString=createblogDto.sub_category_ids;
        // const subCategoryIdsArray = subCategoryIdsString.split(',').map(id => id.trim());

        createblogDto.user_id=userId;

        // createblogDto.subArraycategory=subCategoryIdsArray;
        const createdBlog=await this.blogRepository.create(createblogDto);
        console.log("createdBlog:",createdBlog);
        await this.categoryRepository.updatePosts(createblogDto.category,createdBlog._id,'blog');
        // await this.subcategoryRepository.updatePosts(createblogDto.sub_category,createdBlog._id,'blog');
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

    async update(blogId:string,data:UpdateBlog){
       return await this.blogRepository.update(blogId,data);
    }

    async delete(blogId:string){
        return await this.blogRepository.delete(blogId);
    }

    async updateLike(blogId:string,likeId:string)
    {
        return await this.blogRepository.updateLike(blogId,likeId);
    }

    async Get(){
        return await this.blogRepository.all();
    }

    async deletebloguser(userid:string){
        const data=await this.blogRepository.deletebyUserId(userid);     
        return data;
    }
}
