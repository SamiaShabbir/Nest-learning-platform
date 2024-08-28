import { BlogLike } from './../../schemas/BlogLike.schema';
import { Like } from "src/schemas/Like.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLike } from '../dto/createLike.dto';
export class LikeRepository{
    constructor(
        @InjectModel(Like.name) private likeModel: Model<Like>,
        // @InjectModel(BlogLike.name) private BlogLike:Model<BlogLike>
    ) {}

    async create(createlikeDto:CreateLike):Promise<any>{
        const createNew= await new this.likeModel(createlikeDto);
        return createNew.save();
    }
}