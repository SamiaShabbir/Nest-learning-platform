import { Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonRepositpory } from "./repository/lesson.repository";
@Injectable()
export class LessonService{
    constructor( private lessonRepository:LessonRepositpory){}
    async create(createLessonDto: CreateLessonDto) {
        return await this.lessonRepository.create(createLessonDto);
      }  
}