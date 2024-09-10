import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonRepositpory } from "./repository/lesson.repository";
import { Types } from "mongoose";
import { CourseRepository } from "./repository/course.repository";
@Injectable()
export class LessonService{
    constructor( private lessonRepository:LessonRepositpory,
                 private courseRepository:CourseRepository
    ){}
    async create(createLessonDto: CreateLessonDto) {
      const course = new Types.ObjectId(createLessonDto.course_id);
       createLessonDto.course=course;
       const check=this.courseRepository.checkcourseuser(createLessonDto.course,createLessonDto.user_id);
       if(!check){
          return false;
       }
       const createdLesson= await this.lessonRepository.create(createLessonDto);
       await this.courseRepository.updatelesson(course,createdLesson);
       return createdLesson;
      }
    async getbyId(lessonId:string){
      return await this.lessonRepository.getbyId(lessonId);
    }

    async delete(lessonId:string,userId:string){
      const lesson=await this.getbyId(lessonId);
      if(!lesson){
         throw new NotFoundException("Lesson Not Found");
      }
      const checklesson=await this.courseRepository.checkcourseuser(lesson.course,userId);
      if(!checklesson){
        throw new ForbiddenException("You Don't Have permission");
      }
      return await this.lessonRepository.delete(lessonId);
    }



}