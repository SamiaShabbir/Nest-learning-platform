import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/User.schama';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../schemas/Token.schema';
import {stringify} from "flatted";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.userModel.findOne({ email: email });
    console.log(findUser);
    if (!findUser) {
      throw new UnauthorizedException('Invalid email');
    }

    if (findUser.token_id !== null && findUser.IsloggedIn !== false) {
      throw new UnauthorizedException(
        'Cannot login Please loggout first from previous device to login again',
      );
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const data = this.createToken(findUser);

    return data;
  }

  private async createToken(user) {
    const payload = {
      user_id: user._id,
      username: user.username,
      role: user.role_id,
    };
    const token = await this.jwtService.signAsync(payload);
    const InsertToken = new this.tokenModel({
      user_id: user._id,
      token: token,
    });
    InsertToken.save();
    const userupdate = this.userModel.findByIdAndUpdate(
      user._id,
      {
        IsloggedIn: true,
        token_id: InsertToken.id,
      }
    );
    if (InsertToken && userupdate) {
      return {
        data: user,
        accessToken: token,
      };
    }

    return null;
  }
}
