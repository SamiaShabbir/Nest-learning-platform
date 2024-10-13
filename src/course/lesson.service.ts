import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonRepositpory } from "./repository/lesson.repository";
import { Types } from "mongoose";
import { CourseRepository } from "./repository/course.repository";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
@Injectable()
export class LessonService{
    constructor( private lessonRepository:LessonRepositpory,
                 private courseRepository:CourseRepository
    ){}
    async create(createLessonDto: CreateLessonDto) {
      const data=await this.countLesson(createLessonDto.course_id);
      const courseData= await this.courseRepository.getById(createLessonDto.course_id);
      console.log("lesson data:",data.no_of_lessons,"course data:",courseData.no_of_lesson);
      if(data.no_of_lessons==courseData.no_of_lesson){
        throw new ForbiddenException("U can Not create more lessons");
      }
      createLessonDto.lesson_no=data.no_of_lessons+1;
      // const subCategoryIdsString=createLessonDto.sub_category_ids;
      // const subCategoryIdsArray = subCategoryIdsString.split(',').map(id => id.trim());
      // createLessonDto.subArraycategory=subCategoryIdsArray;
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

    async countLesson(course_id:string){
     return this.lessonRepository.countLesson(course_id);
    }

    async nextlesson(course_id:string,lesson_no){
      return await this.lessonRepository.nextLesson(course_id,lesson_no);
    }

    async lessonbyCourseId(id:string){
      return await this.lessonRepository.lessonbyCourseId(id);
    }

    async update(id:string,createcourseDto:UpdateLessonDto,userId:any){
     
        return await this.lessonRepository.update(id,createcourseDto);
    }

   
}