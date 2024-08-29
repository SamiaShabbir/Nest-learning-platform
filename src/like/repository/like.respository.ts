import { BlogLike } from './../../schemas/BlogLike.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLike } from '../dto/createLike.dto';
export class LikeRepository{
    constructor(
        @InjectModel(BlogLike.name) private bloglikeModel:Model<BlogLike>
    ) {}

    async create(createlikeDto:CreateLike):Promise<any>{
        const createNew= await new this.bloglikeModel(createlikeDto);
        return createNew.save();
    }

    async get():Promise<any>{
        return await this.bloglikeModel.find().populate('blogId');
    }
}