import { Injectable } from '@nestjs/common';
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

    async update(id:string,createcourseDto:CreateCourseDto){
        return await this.courseRepository.update(id,createcourseDto);
    }

    async GetById(courseId:string){
        return await this.courseRepository.getById(courseId);
    }
}
