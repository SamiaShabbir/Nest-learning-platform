import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Enrollment } from "src/schemas/Enrollement.schema";
import { CreateEnrollmentDto } from "../dto/create-enrollment.dto";
import { CreateProgressDto } from "../dto/create-progress.dto";
@Injectable()
export class EnrollmentRepository{

    constructor(@InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment> ){}
    
    async create(createEnrollmentDto:CreateEnrollmentDto):Promise<Enrollment>{
  
      const newEnrollment=new this.enrollmentModel(createEnrollmentDto);

        return  await newEnrollment.save();
      }
      async getBycourseId(course_id:string):Promise<Enrollment[]>{
        return await this.enrollmentModel.find({course:course_id});
      }

      async getByuserId(user_id:string):Promise<Enrollment[]>{
        return await this.enrollmentModel.find({student:user_id}).populate(['course','student']);
      }

      async getById(id:string):Promise<any>{
        const data= await this.enrollmentModel.findById(id).populate('course');
        return {
         Enrollment:data,
         Course:data.course
        }
      }

      async updateProgress(createProgressDto:CreateProgressDto):Promise<Enrollment>{
        return this.enrollmentModel.findByIdAndUpdate(createProgressDto.enrollment_id,{
          current_lesson:createProgressDto.lesson_id,
          progress:createProgressDto.progress
        },{new:true});
      }


}