import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schama';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Role } from '../schemas/Role.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  private rolesarray = [
    {
      role_name: 'admin',
      permissions: 'all',
    },
    {
      role_name: 'student',
      permissions: 'student',
    },
    {
      role_name: 'teacher',
      permissions: 'teacher',
    },
  ];
  createRole() {
    return this.roleModel.insertMany(this.rolesarray);
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userDetails } = createUserDto;
    const hashedPassword = await this.hashPassword(password);

    const newUser = new this.userModel({
      ...userDetails,
      password: hashedPassword,
      token_id:null
    });

    return newUser.save();
  }
  GetUsers() {
    return this.userModel.find().populate('role_id');
  }
  GetUserById(id: string) {
    return this.userModel.findById(id);
  }
  UpdateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  DeleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  FindByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async getRole():Promise<any>{
   return await this.roleModel.find();
  }
}
