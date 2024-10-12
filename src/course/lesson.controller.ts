import { Request,BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiConsumes, ApiTags, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../shared/guards/roles.gaurd';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateLessonDto } from './dto/update-course.dto';

@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    @Post('create')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload lesson with PDF and video files' })
    @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]))
    async createLesson(
        @Request() req,
        @Body() createLessonDto: CreateLessonDto,
        @UploadedFiles() files: { file?: Express.Multer.File[], video?: Express.Multer.File[] }
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

        const file = files.file ? files.file[0] : null;
        const video = files.video ? files.video[0] : null;

        const filePath = file ? saveFile(file, 'file') : null;
        const videoPath = video ? saveFile(video, 'video') : null;

        const result = await this.lessonService.create({
            ...createLessonDto,
            file: filePath,
            video: videoPath,
            user_id:req.user.id
        });

        if(!result && result==false){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "Lesson created successfully",
            data: result
        };
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      description: 'enter the course Id',
    })
    async getbyId(@Param('id') id:string){
      console.log("courseId",id);
      if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new BadRequestException('Invalid userId format. Must be a 24-character hex string.');
        }
      const result =await this.lessonService.getbyId(id);
      if(!result || result==null){
          return {
              code:401,
              status:"failed",
              message:"No Data Found"
            }; 
      }
  
      return{
          code:200,
          status:"success",
          message:"Lesson Fetched Successfully",
          data:result
      }
    }

    @Delete(':id')
    @Roles(Role.TEACHER,Role.USER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    async deleteCourse(@Param('id') id:string,@Request() req){
       const result= await this.lessonService.delete(id,req.user.id);
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
        message:"Course Deleted Successfully"
       }
    }
    
    @Get('bycourse/:id')
    async getlessonbyCourseId(@Param('id') id:string){
       const result= await this.lessonService.lessonbyCourseId(id);
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
        message:"Course Fetched Successfully",
        data:result
       }
    }

  @Put(':id')
  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Enter the lessonid'
  })
  @ApiBody({
    type: UpdateLessonDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'video', maxCount: 1 }
  ]))
  async update (@Param('id') id:string,
  @Body() createcourseDto:UpdateLessonDto,@Request() req,
  @UploadedFiles() files: { file?: Express.Multer.File[], video?: Express.Multer.File[]}){
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

    const file = files.file ? files.file[0] : null;
    const video = files.video ? files.video[0] : null;

    const filePath = file ? saveFile(file, 'file') : null;
    const videoPath = video ? saveFile(video, 'video') : null;
    if(file && filePath!==null){
        createcourseDto.file=filePath;
      }
      if(video && videoPath!==null){
        createcourseDto.video=videoPath;
      }
    const result= await this.lessonService.update(id,createcourseDto,req.user.id);
    console.log(result);
    if(!result || result==null){
      return {
        code:401,
        status:"failed",
        message:"Course not found"
      }
    }

    return {
      code:200,
      status:"success",
      message:"Course updated successfully",
      data:result
    }
  }

}
