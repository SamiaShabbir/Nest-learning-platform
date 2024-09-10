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
      return await this.courseModel.find().populate(['lessons','user_id']).populate({path: 'likes',
        populate: {
          path: 'userId',
          select: 'first_name last_name username email', // Adjust fields as needed
        },});
    }

    async getByUserId(userId:string):Promise<Course[]>{
      const objectId = new Types.ObjectId(userId);
      return await this.courseModel.find({user_id:objectId});
    }

    async update(id:string,createcourseDto:CreateCourseDto):Promise<Boolean>{
        return await this.courseModel.findByIdAndUpdate(id,createcourseDto,{new:true});
    }

    async getById(courseId:string):Promise<Course>{
      return await this.courseModel.findById(courseId).populate('lessons');
    }

    async delete(courseId:string):Promise<Boolean>{
      return await this.courseModel.findByIdAndDelete(courseId);
    }

    async updateLike(courseId:string,likeId:string): Promise<Course>{
      return await this.courseModel.findByIdAndUpdate(
        courseId,
        { $addToSet: { likes: likeId},
        $inc: { likeCount: 1 } 
        },  
        { new: true }
      )
    }

    async updatelesson(courseId,lessonId):Promise<Course>{
        return this.courseModel.findByIdAndUpdate(courseId,{
          $addToSet: { lessons: lessonId}
        },
      {new:true});
    }

    async checkcourseuser(courseId:any,user_id:string):Promise<Course>{
     const result=await this.courseModel.findOne({user_id:user_id},{id:courseId});
     return result;
    }

}