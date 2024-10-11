import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Get,
  Param,
  HttpException,
  HttpStatus,
  BadRequestException,
  Patch,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { ApiTags,
         ApiResponse,
         ApiBody,
         ApiParam,
         ApiBearerAuth,  
         ApiQuery,
         ApiConsumes} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'User Created Successfully'})
  @ApiResponse({ status: 403, description: 'Something Went Wrong'})
  @ApiBody({
     type: CreateUserDto,
     description: 'Json structure for user object',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name:'cv',maxCount:1 }
]))
  @ApiQuery({ name: 'role', enum: Role })
  async createUser(@Body() createUserDto: CreateUserDto,
            @Query('role') role: Role = Role.USER,
            @UploadedFiles() files: { picture?: Express.Multer.File[], cv?: Express.Multer.File[]}
          ) {
            console.log(createUserDto);
            const projectRoot = path.resolve(__dirname, '../../');
            const uploadDir = path.join(projectRoot, 'src/uploads');
    
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory and any necessary parent directories
            }
    
            const saveFile = (file: Express.Multer.File, fieldName: string) => {
                const fileName = `${fieldName}-${Date.now()}-${file.originalname}`;
    
                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, file.buffer);
                return path.join('uploads', fileName); // Return the relative path
            };
    
            const file = files.picture ? files.picture[0] : null;
    
            const filePath = file ? saveFile(file, 'picture') : null;

            const cv=files.cv ? files.cv[0] : null;

            const cvfilePath = cv ? saveFile(cv, 'cv') : null;
    
    console.log('this_role',role);
    console.log(createUserDto);
    const result=await this.userService.createUser({...createUserDto,
      picture:filePath,
      cv:cvfilePath
    },role);
    if(!result || result==null){
      return {
          code:401,
          status:"failed",
          message:"Something Went Wrong"
        }; 
  }
    return {
      code:200,
      status:"success",
      message:"User Created Successfully",
      data: result
     }
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ status: 201, description: 'User Data'})
 async GetUser() {
    return await this.userService.GetUsers();
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('roles')
  @ApiResponse({ status: 200, description: 'Role Data'})
  async getRoles()
  {
    const result= await this.userService.getRole();
     if(!result){
      return {
        code:403,
        status:"failed",
        message:"Error Occured Try Again"
      };
     }
     return {
      code:200,
      status:"success",
      message:"User Fetched Successfully",
      data:result
     }
  }
  
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User Data'})
  @UseGuards(AuthGuard)
  @ApiParam({name:'id'})
  @ApiBearerAuth()
  async getUserbyId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const findUser = await this.userService.GetUserById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
   
     return {
      code:200,
      status:"success",
      message:"User Fetched Successfully",
      data:findUser
     }
  }
  @Roles(Role.ADMIN,Role.USER,Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiResponse({ status: 201, description: 'User Data'})
  @ApiBody({
     type:UpdateUserDto,
     description: 'Json structure for user object',
  })
  @ApiParam({name:'id'})
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const updateUser = await this.userService.UpdateUser(id, updateUserDto);
    if (!updateUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      code:200,
      status:"success",
      message:"User Fetched Successfully",
      data:updateUser
     }
    
  }
  @Roles(Role.ADMIN,Role.USER,Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiResponse({ status: 201, description: 'User Data'})
  @ApiBody({
     type:UpdateUserDto,
     description: 'Json structure for user object',
  })
  @ApiParam({name:'id'})
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const DeleteUser = await this.userService.DeleteUser(id);
    if (!DeleteUser)
    {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return DeleteUser;
  }

  @Get('create/roles')
  async getrole(){
    return this.userService.createRole();
  } 

  @Patch('verify/:id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User Data'})
  @UseGuards(AuthGuard,RolesGuard)
  @ApiParam({name:'id'})
  @ApiBearerAuth()
  async verifyTeacher(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const findUser=await this.userService.GetUserById(id);
    if(!findUser){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if(findUser.is_verified==true){
      return {
        code:401,
        status:"failed",
        message:"User is already verified",
       }
    }
    const updateUser = await this.userService.verifyTeacher(id);
    if (!updateUser)
     return {
      code:200,
      status:"success",
      message:"User verified successfully Successfully",
      data:updateUser
     }
  }
}
