import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { CourseRepository } from './repository/course.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { SubCategoryRepository } from 'src/category/repository/subcategory.repository';
import { EnrollmentRepository } from './repository/enrollment.respository';

@Injectable()
export class CourseService {
    constructor(private courseRepository:CourseRepository,
        private categoryRepository:CategoryRepository,
        private subcategoryRepository:SubCategoryRepository,
        private enrollmentRepository:EnrollmentRepository
    ){}

    async create(createcourseDto:CreateCourseDto){
        const createdCourse= await this.courseRepository.create(createcourseDto);
        await this.categoryRepository.updatePosts(createdCourse.category,createdCourse._id,'course');
        await this.subcategoryRepository.updatePosts(createdCourse.sub_category,createdCourse._id,'course');
        return createdCourse;
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
