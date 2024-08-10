import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/User.schama';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../schemas/Token.schema';
import { AuthRepository } from './repositories/auth.repository';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.userModel.findOne({ email: email });
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
    const userupdate = await this.userModel.findByIdAndUpdate(
      user._id,
      {
        IsloggedIn: true,
        token_id: InsertToken.id,
      },{new:true}
    );
    if (InsertToken && userupdate) {
      return {
        data: userupdate,
        accessToken: token,
      };
    }

    return null;
  }

  async logout(token:string,user:any):Promise<any> {
    const response= await this.authRepository.logout(token,user);

    if(response==false){
      throw new UnauthorizedException('Invalid password');
    }

    return "User logged Out Succcesfully";
 }
  async CheckToken(token:string):Promise<boolean>{
    return this.authRepository.CheckToken(token);
  }

  async GetUserById(userId:string):Promise<any>{
    return await this.authRepository.GetUserById(userId);
  }

}
