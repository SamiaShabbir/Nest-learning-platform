import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCourseDto{
    @ApiProperty({
        example: 'course title'})
      @IsNotEmpty()
      @IsString()
      title: string;

      @ApiProperty({
        example: 'course '})
      @IsString()
      @IsOptional()
      description:string;

      @IsString()
      @IsOptional()
      user_id:string;
}