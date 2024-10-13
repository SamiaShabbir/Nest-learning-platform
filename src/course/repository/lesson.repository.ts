import { InjectModel } from "@nestjs/mongoose";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { Lesson } from "src/schemas/Lesson.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateLessonDto } from "../dto/update-lesson.dto";

@Injectable()
export class LessonRepositpory{

    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson> ){}
    
    async create(createlessonDto:CreateLessonDto):Promise<Lesson>{
  
      const newLesson=new this.lessonModel(createlessonDto);
       await newLesson.save();
  //      for (const subcategory of createlessonDto.subArraycategory) {
  //       const data= await this.lessonModel.findByIdAndUpdate(
  //         newLesson._id,
  //      { $addToSet: { sub_category: subcategory } },
  //      { new: true }
  //      ).exec();
  //  }
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
    async nextLesson(course_id:string,lesson_no:string):Promise<any>{
      return await this.lessonModel.find({course:course_id,lesson_no:lesson_no});
    }

    async lessonbyCourseId(id:string):Promise<Lesson[]>{
      return await this.lessonModel.find({course:id});

    }

    async lessonDelete(courseIds: string[]) {
      courseIds.forEach(async (courseId) => {
          try {
              const result = await this.lessonModel.deleteMany({ course_id: courseId });
  
              if (result.deletedCount > 0) {
                  console.log(`Deleted ${result.deletedCount} lessons for course ID: ${courseId}`);
              } else {
                  console.log(`No lessons found for course ID: ${courseId}`);
              }
          } catch (error) {
              console.error(`Error deleting lessons for course ID: ${courseId}`, error);
          }
      });
  
      return { message: `Lesson deletion process completed.` };
  }

  async update(id:string,createcourseDto:UpdateLessonDto):Promise<Boolean>{
    return await this.lessonModel.findByIdAndUpdate(id,createcourseDto,{new:true});
  }
   async getbyLessonNo(courseId:string,lesson_no:string):Promise<Lesson>{
    return await this.lessonModel.findOne({course:courseId,lesson_no:lesson_no});
   }
}