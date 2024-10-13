import { CreateLessonDto } from './create-lesson.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateLessonDto {

    @ApiPropertyOptional({ description: 'Title of the lesson' })
    @IsString()
    title: string;
  
  
    @ApiPropertyOptional({ description: 'Description of the lesson' })
    @IsString()
    @IsOptional()
    description?: string;
  
    @ApiPropertyOptional({ description: 'Path to the PDF file', type: 'string', format: 'binary' })
    @IsString()
    @IsOptional()
    file?: string; 
  
    @ApiPropertyOptional({ description: 'Path to the video file', type: 'string', format: 'binary' })
    @IsString()
    @IsOptional()
    video?: string;
  
    @ApiPropertyOptional({ description: 'ID of the course' })
    @IsString()
    @IsOptional()
    course_id?: string; 
  
    @ApiPropertyOptional({ description: 'category id' })
    @IsString()
    category: string;
  
  
    @ApiPropertyOptional({ description: '1|0' })
    @IsNumber()
    status: number;
  
    // @ApiPropertyOptional({ description: 'sub category id', example: ['category_id','another_id'] })
    // @IsString()
    // @IsNotEmpty()
    // sub_category_ids: string;
  
    course:any;
    user_id:string;
    subArraycategory:string[];
    lesson_no:number;
}