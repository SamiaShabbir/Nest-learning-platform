import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Enrollment } from "src/schemas/Enrollement.schema";
import { CreateEnrollmentDto } from "../dto/create-enrollment.dto";
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

}