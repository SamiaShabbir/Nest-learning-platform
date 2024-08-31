import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { CourseRepository } from './repository/course.repository';

@Injectable()
export class CourseService {
    constructor(private courseRepository:CourseRepository){}

    async create(createcourseDto:CreateCourseDto){
        console.log(createcourseDto);
        return await this.courseRepository.create(createcourseDto);
       
    }

    async get(){
        return await this.courseRepository.get();
    }

    async getByUserId(userId:string){
        return await this.courseRepository.getByUserId(userId);        
    }

    async update(id:string,createcourseDto:CreateCourseDto,userId:any){
        const checkuser=await this.courseRepository.getById(id);
        if(checkuser.user_id==userId){
            return await this.courseRepository.update(id,createcourseDto);
        }

        throw new ForbiddenException("you don't have permission to do this action");

    }

    async GetById(courseId:string){
        return await this.courseRepository.getById(courseId);
    }

    async delete(courseId:string,userId:any){
        const checkuser=await this.courseRepository.getById(courseId);
        if(checkuser.user_id==userId){
            return await this.courseRepository.delete(courseId);

        }
        throw new ForbiddenException("you don't have permission to do this action");
    }

    async updateLike(courseId:string,likeId:string){
        
        return await this.courseRepository.updateLike(courseId,likeId);
    }
}
