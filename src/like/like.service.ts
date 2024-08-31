import { ForbiddenException, Injectable } from '@nestjs/common';
import { LikeRepository } from './repository/like.respository';
import { CreateLike } from './dto/createLike.dto';
import { BlogService } from 'src/blog/blog.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class LikeService {
    constructor( private likeRepository:LikeRepository,
                 private blogService:BlogService,
                 private courseService:CourseService
    ){}

    async create(createlikeDto:CreateLike){
        console.log("createlikeDto:",createlikeDto);
        const checkExisted=this.likeRepository.checkExisted(createlikeDto.type,createlikeDto.typeId,createlikeDto.userId);
        if(checkExisted){
          throw new ForbiddenException("U Have Already Liked This");
        }
        if(createlikeDto.type=="BlogLike")
        {
            createlikeDto.blogId=createlikeDto.typeId;
            const likeCreated=await this.likeRepository.create(createlikeDto);
            console.log(likeCreated);
            const updateBlog=await this.blogService.updateLike(createlikeDto.blogId,likeCreated.id);            
            return updateBlog || null;
        
        }
        else if(createlikeDto.type=="CourseLike")
        {
            createlikeDto.courseId=createlikeDto.typeId;
            const likeCreated=await this.likeRepository.create(createlikeDto);
    
            const updateBlog=await this.courseService.updateLike(createlikeDto.courseId,likeCreated.id);            
            return updateBlog || null;
        
        }
        else {
            throw new Error('Invalid type provided');

        }

     
    }

    async get()
    {
        return this.likeRepository.get();
    }
}
