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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import {ApiTags,ApiResponse
  ,ApiBody,
  ApiParam} from '@nestjs/swagger'

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
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }
  @Get()
  @ApiResponse({ status: 201, description: 'User Data'})
  @ApiBody({
     description: 'Json structure for user object',
  })
  GetUser() {
    return this.userService.GetUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'User Data'})
  @ApiBody({
     description: 'Json structure for user object',
  })
  @ApiParam({name:'id'})
  getUserbyId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const findUser = this.userService.GetUserById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return findUser;
  }
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return DeleteUser;
  }
}
