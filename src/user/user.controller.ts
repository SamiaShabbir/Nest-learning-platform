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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }
  @Get()
  GetUser() {
    return this.userService.GetUsers();
  }

  @Get(':id')
  getUserbyId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const findUser = this.userService.GetUserById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return findUser;
  }
  @Patch(':id')
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
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Please enter a valid id');
    const DeleteUser = await this.userService.DeleteUser(id);
    if (!DeleteUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return DeleteUser;
  }
}
