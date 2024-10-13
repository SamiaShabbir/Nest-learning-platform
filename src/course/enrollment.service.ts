import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Enrollment } from '../schemas/Enrollement.schema';
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { EnrollmentRepository } from "./repository/enrollment.respository";
import { CourseRepository } from './repository/course.repository';
import { CreateProgressDto } from './dto/create-progress.dto';
import { LessonService } from "./lesson.service";

@Injectable()
export class EnrollmentService{
    constructor( private enrollmentRepository:EnrollmentRepository,
                 private CourseRepository:CourseRepository,
                 private lessonService:LessonService
    ){}
    async create(createEnrollmentDto: CreateEnrollmentDto) {
        const check=await this.enrollmentRepository.CheckForCreate(createEnrollmentDto.course,createEnrollmentDto.student);
        if(check){
            throw new ForbiddenException("You have already enrolled in this course");
        }
        return await this.enrollmentRepository.create(createEnrollmentDto);
    }

    async getByCourseId(course_id:string){
        return await this.enrollmentRepository.getBycourseId(course_id);
    }

    async getByUserId(user_id:string){
        return await this.enrollmentRepository.getByuserId(user_id);
    }

    async getEnrollmentById(enrollment_id:string){
        return await this.enrollmentRepository.getById(enrollment_id);
    }
    async getProgress(createProgressDto: CreateProgressDto) {
       const enrolldata=await this.getEnrollmentById(createProgressDto.enrollment_id);
       const total_lesson=enrolldata.Course[0].no_of_lesson;
       const lesson=await this.lessonService.getbyId(createProgressDto.lesson_id);
       if(lesson.lesson_no<=enrolldata.lesson_no){
        throw new NotAcceptableException('Progress can not be saved');
       }
       createProgressDto.progress=(lesson.lesson_no/total_lesson)*100;
       createProgressDto.lesson_no=lesson.lesson_no;
       return await this.enrollmentRepository.updateProgress(createProgressDto);
    }
    async getLesson(courseId:string,lessonId:string){
        const lesson=await this.lessonService.getbyId(lessonId);
        const nextlesson=await this.lessonService.nextlesson(courseId,lesson.lesson_no+1);
        return nextlesson;
    }

    async getbyLessonNo(courseId:string,lesson_no:string){
        return await this.lessonService.getbyLessonNo(courseId,lesson_no);
    }

    async Delete(enrollId:string){
      return await this.enrollmentRepository.Delete(enrollId);
    }
}