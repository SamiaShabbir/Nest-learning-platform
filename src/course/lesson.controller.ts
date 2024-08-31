import { Body, Controller, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';

@ApiTags('lesson')
@Controller('lesson')
export class LessonController{
    constructor(private lessonService:LessonService){}

    @Post('create')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiOperation({ summary: 'Upload lesson with PDF and video files' })
    @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('files', 2)) // Handle up to 2 files
    async uploadFiles(
      @Body() createLessonDto: CreateLessonDto,
      @UploadedFiles() files: Express.Multer.File[],
      @Res() res: Response
    ) {
      const file = files.find(file => file.fieldname === 'file');
      const video = files.find(file => file.fieldname === 'video');
  
      // Assume `file` is the PDF and `video` is the video
      const filePath = file ? file.path : null;
      const videoPath = video ? video.path : null;
  
      const result = await this.lessonService.create({
        ...createLessonDto,
        file: filePath,
        video: videoPath,
      });
  
      return {
            code:200,
            status:"success",
            message:"blog updated successfully",
            data:result
      };
    }
}