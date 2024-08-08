// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Token } from '../schemas/Token.schema'; // Adjust the path as necessary
// import { User } from 'src/schemas/User.schama';
// @Injectable()
// export class TokenService {
//   constructor(
//     @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
//     @InjectModel(User.name) private readonly userModel: Model<User>,

//   ) {}

//   async isValidToken(tokenId: string): Promise<boolean> {
//     const token = await this.tokenModel.findOne({ tokenId }).exec();
//     const user = await this.userModel.findOne({ tokenId: token._id }).exec(); // Adjust based on your schema
//     if (!token && !user) {
//       throw new NotFoundException('Token not found');
//     }

//     return true; // Token is valid
//   }
// }
