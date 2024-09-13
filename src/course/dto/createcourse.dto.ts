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

      @ApiProperty({
        example: 'category_id'})
      @IsNotEmpty()
      category: string;
    
      @ApiProperty({
        example: ['category_id','another_id']})
      @IsNotEmpty()
      sub_category_ids: string[];
      
      @IsString()
      @IsOptional()
      user_id:string;
}