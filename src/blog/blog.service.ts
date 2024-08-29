import { Injectable } from '@nestjs/common';
import { BlogRepository } from './repositroy/blog.repository';
import { CreateBlog } from './dto/CreateBlog.dto';
import { CreateLike } from 'src/like/dto/createLike.dto';
@Injectable()
export class BlogService {
    constructor(private blogRepository:BlogRepository){}

    async create(createblogDto:CreateBlog,userId:string)
    {
        createblogDto.user_id=userId;
        return await this.blogRepository.create(createblogDto);
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
