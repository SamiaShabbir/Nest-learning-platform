import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from 'src/schemas/Course.schema';
import { CreateCourseDto } from '../dto/createcourse.dto';
export class CourseRepository{
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>) {}
  
    async create(createcourseDto:CreateCourseDto):Promise<Course>{
      const createCourse=await new this.courseModel(createcourseDto);
      return createCourse.save();
    }

    async get():Promise<Course[]>{
      return await this.courseModel.find().populate(['lessons','user_id']);
    }

    async getByUserId(userId:string):Promise<Course[]>{
      const objectId = new Types.ObjectId(userId);
      return await this.courseModel.find({user_id:objectId});
    }

    async update(id:string,createcourseDto:CreateCourseDto):Promise<Boolean>{
        return await this.courseModel.findByIdAndUpdate(id,createcourseDto,{new:true});
    }

    async getById(courseId:string):Promise<Course>{
      return await this.courseModel.findById(courseId);
    }
}