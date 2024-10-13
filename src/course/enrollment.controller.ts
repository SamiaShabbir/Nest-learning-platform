import { Request,BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiConsumes, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../shared/guards/roles.gaurd';
import * as fs from 'fs';
import * as path from 'path';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { CreateProgressDto } from './dto/create-progress.dto';
import mongoose from 'mongoose';

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService:EnrollmentService){}

    @Post('create')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'For Students to Join Course' })
    @ApiResponse({ status: 201, description: 'The student has been enrolled successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async createEnrollment(
        @Request() req,
        @Body() createEnrollmentDto: CreateEnrollmentDto
    ) {

        const result = await this.enrollmentService.create({
            ...createEnrollmentDto,
            student:req.user.id
        });

        if(!result){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "Enrolled successfully",
            data: result
        };
    }

    @Get(':course_id')
    @ApiParam({name: 'course_id'})
    @Roles(Role.TEACHER,Role.ADMIN)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({ summary: 'For Teacher to get Enrollments' })
    async GetEnrollmentByCourseId(@Param('course_id') id: string){
        if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new BadRequestException('Invalid userId format. Must be a 24-character hex string.');
          }
        const result =await this.enrollmentService.getByCourseId(id);
        if(!result || result==null || result.length===0){
            return {
                code:401,
                status:"failed",
                message:"No Data Found"
              }; 
        }
  
        return{
            code:200,
            status:"success",
            message:"Courses Fetched Successfully",
            data:result
        }
    }


    @Get('user/:user_id')
    @ApiParam({name: 'user_id'})
    @Roles(Role.USER,Role.ADMIN)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({ summary: 'For student and admin to get Enrollments' })
    async GetEnrollmentByUserId(@Param('user_id') id: string){
        if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new BadRequestException('Invalid userId format. Must be a 24-character hex string.');
          }
        const result =await this.enrollmentService.getByUserId(id);
        if(!result || result==null || result.length===0){
            return {
                code:401,
                status:"failed",
                message:"No Data Found"
              }; 
        }
  
        return{
            code:200,
            status:"success",
            message:"Enrollments Fetched Successfully",
            data:result
        }
    }

    @Post('progres')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'For Students to save progress Course' })
    @ApiResponse({ status: 201, description: 'The student progess saved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async createProgress(
        @Body() createProgressDto: CreateProgressDto
    ) {

        const result = await this.enrollmentService.getProgress(createProgressDto);

        if (!createProgressDto.course_id || createProgressDto.course_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(createProgressDto.course_id)) {
            throw new BadRequestException('Invalid course_id format. Must be a 24-character hex string.');
          }

        if (!createProgressDto.enrollment_id || createProgressDto.enrollment_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(createProgressDto.enrollment_id)) {
            throw new BadRequestException('Invalid enrollment_id format. Must be a 24-character hex string.');
          }
        if (!createProgressDto.lesson_id || createProgressDto.lesson_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(createProgressDto.lesson_id)) {
            throw new BadRequestException('Invalid lesson_id format. Must be a 24-character hex string.');
          }
        if(!result){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "The student progess saved successfully",
            data: result
        };
    }

    @Get('lesson/prev/:course_id/:lesson_no')
    @ApiParam({name: 'course_id'})
    @ApiParam({name: 'lesson_no'})
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'To get prev lesson' })
    @ApiResponse({ status: 201, description: 'The student progess saved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async prevLesson(
        @Param('course_id') course_id: string,
        @Param('lesson_no') lesson_no: string
    ) {
        if (!course_id || course_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(course_id)) {
            throw new BadRequestException('Invalid course_id format. Must be a 24-character hex string.');
          }
        const result = await this.enrollmentService.getbyLessonNo(course_id,lesson_no);
       

        if(!result){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "next lesson fetched successfully",
            data: result
        };
    }

    @Get('lesson/:course_id/:lesson_id')
    @ApiParam({name: 'course_id'})
    @ApiParam({name: 'lesson_id'})
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'To get next lesson' })
    @ApiResponse({ status: 201, description: 'The student progess saved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async nextLesson(
        @Param('course_id') course_id: string,
        @Param('lesson_id') lesson_id: string
    ) {

        const result = await this.enrollmentService.getLesson(course_id,lesson_id);
        console.log(course_id,lesson_id);
        if (!course_id || course_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(course_id)) {
            throw new BadRequestException('Invalid course_id format. Must be a 24-character hex string.');
          }

        if (!lesson_id || lesson_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(lesson_id)) {
            throw new BadRequestException('Invalid lesson_id format. Must be a 24-character hex string.');
          }
        if(!result){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "next lesson fetched successfully",
            data: result
        };
    }

    @Roles(Role.USER)
    @UseGuards(AuthGuard,RolesGuard)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiResponse({ status: 201, description: 'User Data'})
    @ApiParam({name:'id'})
    async deleteUser(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new BadRequestException('Please enter a valid id');
      const DeleteUser = await this.enrollmentService.Delete(id);
      if (!DeleteUser)
      {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return DeleteUser;
    }    
}
