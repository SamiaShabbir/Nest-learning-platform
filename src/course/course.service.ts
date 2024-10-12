import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { CourseRepository } from './repository/course.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { SubCategoryRepository } from 'src/category/repository/subcategory.repository';
import { EnrollmentRepository } from './repository/enrollment.respository';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class CourseService {
    constructor(private courseRepository:CourseRepository,
        private categoryRepository:CategoryRepository,
        private subcategoryRepository:SubCategoryRepository,
        private enrollmentRepository:EnrollmentRepository,
        private emailService:EmailService
    ){}

    async create(createcourseDto:CreateCourseDto){
        const createdCourse= await this.courseRepository.create(createcourseDto);
        await this.categoryRepository.updatePosts(createdCourse.category,createdCourse._id,'course');
        // await this.subcategoryRepository.updatePosts(createdCourse.sub_category,createdCourse._id,'course');
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
        if(checkuser.user_id._id==userId){
            return await this.courseRepository.update(id,createcourseDto);
        }

        throw new ForbiddenException("you don't have permission to do this action");

    }

    async GetById(courseId:string){
         const course=await this.courseRepository.getById(courseId);
         return{
            course,
            lessonCount:course.lessons.length
         }    
    }

    async delete(courseId:string,userId:any){
        const checkuser=await this.courseRepository.getById(courseId);
        // if(checkuser.user_id==userId){
            return await this.courseRepository.delete(courseId);

        // }
        // throw new ForbiddenException("you don't have permission to do this action");
    }

    async updateLike(courseId:string,likeId:string){
        
        return await this.courseRepository.updateLike(courseId,likeId);
    }

    async getforAdmin(){
        return await this.courseRepository.getforAdmin();
    }

    async verifyCourse(id:string){
        const data=await this.courseRepository.verifycourse(id);
        console.log(data.user_id.email);
        await this.emailService.welcomeEmail({email:data.user_id.email,name:data.user_id.first_name,title:data.title,type:"course"});
        return data;
    }
}
