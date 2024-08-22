import { User } from '../../schemas/User.schama';
import { BadRequestException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Model } from 'mongoose';

import { Token } from '../../schemas/Token.schema';

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>) {}
  
    async logout(token:string,user:any):Promise<boolean>{
          
          const userData=await this.userModel.findById(user.id);
          console.log("userData",userData);
          const deletetoken=await this.tokenModel.findByIdAndDelete(userData.token_id);
          const updateUser=await this.userModel.findByIdAndUpdate(userData.id,{token_id:null,IsloggedIn:false});
          if(!deletetoken && !updateUser){
            return false;
          }
          return true;

    }

    async DeleteTokenForGuard(token:string): Promise<any>{
        const getToken=await this.tokenModel.findOne({token:token});
        console.log("getToken",getToken);
        if(getToken){
            // const userId = new mongoose.Types.ObjectId(getToken.user_id);
            await this.userModel.findByIdAndUpdate(getToken.user_id,{token_id:null,IsloggedIn:false});
              await this.DeleteToken(getToken.id);

        }
        return true;
    }
    async CheckToken(token:string):Promise<boolean>{

        const gettoken= await this.tokenModel.findOne({token:token});
        if(!gettoken){
            console.log("first false",gettoken);
           return false;
        }

        const usertoken= await this.userModel.findOne({token_id:gettoken.id});
        if(!usertoken){
            await this.DeleteToken(gettoken.id);
            console.log("second false");
            return false;
        }

        return true;
    }
     async DeleteToken(token:string):Promise<boolean>{
        return await this.tokenModel.findByIdAndDelete(token);
    }

    async DeleteUserToken(userId:string):Promise<boolean>{
        return await this.userModel.findByIdAndUpdate(userId,{token_id:null,IsloggedIn:false});
    }

    async GetUserById(userId:string):Promise<any>{
        console.log(userId);
        return await this.userModel.findById(userId).populate('role_id','token_id');
    }

 

}