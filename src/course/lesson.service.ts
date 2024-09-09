import { Injectable } from "@nestjs/common";
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
       const createdLesson= await this.lessonRepository.create(createLessonDto);
       await this.courseRepository.updatelesson(course,createdLesson);
       return createdLesson;
      }
    async getbyId(lessonId:string){
      return this.lessonRepository.getbyId(lessonId);
    } 

}