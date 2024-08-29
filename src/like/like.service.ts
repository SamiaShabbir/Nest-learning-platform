import { Injectable } from '@nestjs/common';
import { LikeRepository } from './repository/like.respository';
import { CreateLike } from './dto/createLike.dto';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class LikeService {
    constructor(private likeRepository:LikeRepository,
        private blogService:BlogService
    ){}

    async create(createlikeDto:CreateLike){
        const likeCreated=await this.likeRepository.create(createlikeDto);
    
        const updateBlog=await this.blogService.updateLike(createlikeDto.blogId,likeCreated.id);            
    
        return updateBlog;
    }

    async get(){
        return this.likeRepository.get();
    }
}
