import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Enrollment } from '../schemas/Enrollement.schema';
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { EnrollmentRepository } from "./repository/enrollment.respository";
import { CourseRepository } from './repository/course.repository';
@Injectable()
export class EnrollmentService{
    constructor( private enrollmentRepository:EnrollmentRepository,
                 private CourseRepository:CourseRepository,
    ){}
    async create(createEnrollmentDto: CreateEnrollmentDto) {
       return await this.enrollmentRepository.create(createEnrollmentDto);
    }

    async getByCourseId(course_id:string){
        return await this.enrollmentRepository.getBycourseId(course_id);
    }

    async getByUserId(user_id:string){
        return await this.enrollmentRepository.getByuserId(user_id);
    }
   
}