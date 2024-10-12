import { CreateLessonDto } from './create-lesson.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateLessonDto extends CreateLessonDto{}