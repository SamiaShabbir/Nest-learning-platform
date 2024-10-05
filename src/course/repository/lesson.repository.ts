import { InjectModel } from "@nestjs/mongoose";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { Lesson } from "src/schemas/Lesson.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LessonRepositpory{

    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson> ){}
    
    async create(createlessonDto:CreateLessonDto):Promise<Lesson>{
  
      const newLesson=new this.lessonModel(createlessonDto);
       await newLesson.save();
       for (const subcategory of createlessonDto.subArraycategory) {
        const data= await this.lessonModel.findByIdAndUpdate(
          newLesson._id,
       { $addToSet: { sub_category: subcategory } },
       { new: true }
       ).exec();
   }
   return newLesson;
    
      }

    async getbyId(lessonId:string):Promise<Lesson>{
      return await this.lessonModel.findById(lessonId);
    }

    async delete(lessonId:string):Promise<Boolean>{
      return await this.lessonModel.findByIdAndDelete(lessonId);
    }

    async countLesson(course_id:string){
      const lesson= await this.lessonModel.find({course:course_id}).populate("course");
      const count= await this.lessonModel.countDocuments({course:course_id});
      return{
        lessons:lesson,
        no_of_lessons:count
      }

    }

}