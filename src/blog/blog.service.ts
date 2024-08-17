import { Injectable } from '@nestjs/common';
import { BlogRepository } from './repositroy/blog.repository';
import { CreateBlog } from './dto/CreateBlog.dto';
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
}
