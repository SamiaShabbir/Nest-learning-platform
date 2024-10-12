import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schama';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Role } from '../schemas/Role.schema';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private emailService:EmailService,
    private courseService:CourseService
  ) {}

  private rolesarray = [
    {
      name: 'admin',
      permissions: 'all',
    },
    {
      name: 'user',
      permissions: 'user',
    },
    {
      name: 'teacher',
      permissions: 'teacher',
    },
  ];
  createRole() {
    return this.roleModel.insertMany(this.rolesarray);
  }
  async createUser(createUserDto: CreateUserDto,role:string): Promise<User> {
    const Role=await this.roleModel.findOne({name:role});
    console.log('role:',role);
    
    const { password, ...userDetails } = createUserDto;
    const hashedPassword = await this.hashPassword(password);

    const newUser = await new this.userModel({
      ...userDetails,
      password: hashedPassword,
      token_id:null,
      role_id:Role.id
    });
    if(Role.name=='teacher'){
      await this.emailService.welcomeEmail({email:newUser.email,name:newUser.first_name,type:"teacherwelcome"});
    }else if(Role.name=='user'){
      await this.emailService.welcomeEmail({email:newUser.email,name:newUser.first_name,type:"studentwelcome"});

    }
    return await newUser.save();
  }
  async GetUsers() {
    try {
      const users = await this.userModel.find().populate('role_id');
  
      // Categorizing users into students and teachers
      const students = users.filter(user => user.role_id.name === 'user') || [];
      const teachers = users.filter(user => user.role_id.name === 'teacher') || [];
  
      return {
        students,
        teachers
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Could not fetch users");
    }
  }
  GetUserById(id: string) {
    return this.userModel.findById(id);
  }
  UpdateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  async DeleteUser(id: string) {
     await this.courseService.getByUserId(id);
    return await this.userModel.findByIdAndDelete(id);

  }
  FindByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
  async verifyTeacher(id){
    const data=await this.userModel.findByIdAndUpdate(id,{is_verified:true},{new:true});
    await this.emailService.welcomeEmail({email:data.email,name:data.first_name,type:"verificationsucessfull"});
    return data;
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async getRole():Promise<any>{
   return await this.roleModel.find();
  }
}
