import { BlogLike } from './../../schemas/BlogLike.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLike } from '../dto/createLike.dto';
import { CourseLike } from 'src/schemas/CourseLike.schema';
export class LikeRepository{
    constructor(
        @InjectModel(BlogLike.name) private bloglikeModel:Model<BlogLike>,
        @InjectModel(CourseLike.name) private courselikeModel:Model<CourseLike>
    ) {}

    async create(createlikeDto:CreateLike):Promise<any>{
        if (createlikeDto.type === 'BlogLike') {
            const createNew = new this.bloglikeModel(createlikeDto);
            return await createNew.save();
        } else if (createlikeDto.type === 'CourseLike') {
            const createNew = new this.courselikeModel(createlikeDto);
            return await createNew.save();
        } else {
            throw new Error('Invalid type provided');
        }
    }

    async get():Promise<any>{
        return await this.bloglikeModel.find().populate('blogId');
    }

    async checkExisted(type:string,typeId:string,userId:string):Promise<any>{
        if(type=="BlogLike") {
           const result=this.bloglikeModel.find({userId:userId,blogId:typeId})
           return result;
        }else if(type=="CourseLike") {
            const result=this.courselikeModel.find({userId:userId,courseId:typeId})
            return result;
        }else {
            throw new Error('Invalid type provided');
        }
    }
}