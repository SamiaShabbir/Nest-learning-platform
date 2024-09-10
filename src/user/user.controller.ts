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
]))
  @ApiQuery({ name: 'role', enum: Role })
  createUser(@Body() createUserDto: CreateUserDto,
            @Query('role') role: Role = Role.USER,
            @UploadedFiles() files: { picture?: Express.Multer.File[] }
          ) {
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
    
    console.log('this_role',role);
    console.log(createUserDto);
    return this.userService.createUser({...createUserDto,
      picture:filePath
    },role);
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ status: 201, description: 'User Data'})
  GetUser() {
    return this.userService.GetUsers();
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('roles')
  @ApiResponse({ status: 200, description: 'Role Data'})
  async getRoles()
  {
    return await this.userService.getRole();
  }
  
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User Data'})
  @UseGuards(AuthGuard)
  @ApiParam({name:'id'})
  @ApiBearerAuth()
  getUserbyId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const findUser = this.userService.GetUserById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return findUser;
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
    return updateUser;
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

}
