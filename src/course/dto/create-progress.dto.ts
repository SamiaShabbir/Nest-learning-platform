import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateProgressDto{
   
    @ApiProperty({
     name: "lesson_id",
   })
   @IsString()
   @IsNotEmpty()
   lesson_id:string;

   @ApiPropertyOptional({
     name: 'course_id',
   })
  @IsString()
  @IsOptional()
  course_id:string;
  @ApiProperty({

    name: "enrollment_id",
  })
  @IsString()
  @IsNotEmpty()
  enrollment_id:string;

  progress:number;
  lesson_no:number;
}