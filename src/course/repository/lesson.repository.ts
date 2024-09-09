import { InjectModel } from "@nestjs/mongoose";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { Lesson } from "src/schemas/Lesson.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class LessonRepositpory{

    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson> ){}
    
    async create(createlessonDto:CreateLessonDto):Promise<Lesson>{
      console.log(createlessonDto);
  
      const newLesson=new this.lessonModel(createlessonDto);
      return await newLesson.save();
    }

    async getbyId(lessonId:string):Promise<Lesson>{
      return await this.lessonModel.findById(lessonId);
    }

}