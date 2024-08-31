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
  file?: string; // Path or URL to the PDF file

  @ApiPropertyOptional({ description: 'Path to the video file', type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  video?: string; // Path or URL to the video file

  @ApiPropertyOptional({ description: 'ID of the course' })
  @IsString()
  @IsOptional()
  course?: string; // ID of the course
}
