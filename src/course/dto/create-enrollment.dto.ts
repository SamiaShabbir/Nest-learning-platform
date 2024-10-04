import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
    
  student: string;

  @ApiPropertyOptional({ description: 'course_id', type: 'string'})
  @IsString()
  @IsOptional()
  course?: string;

}
