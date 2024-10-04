import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLessonDto {
    
  @ApiProperty({ description: 'Title of the lesson' })
  @IsString()
  @IsNotEmpty()
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

  @ApiProperty({ description: 'category id' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'sub category id', example: ['category_id','another_id'] })
  @IsString()
  @IsNotEmpty()
  sub_category_ids: string;

  course:any;
  user_id:string;
  subArraycategory:string[];


}
