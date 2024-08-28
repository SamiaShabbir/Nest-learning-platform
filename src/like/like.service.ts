import { Injectable } from '@nestjs/common';
import { LikeRepository } from './repository/like.respository';
import { CreateLike } from './dto/createLike.dto';

@Injectable()
export class LikeService {
    constructor(private likeRepository:LikeRepository){}

    async create(createlikeDto:CreateLike){
        return this.likeRepository.create(createlikeDto);
    }
}
