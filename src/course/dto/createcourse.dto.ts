import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

      @IsNumber()
      @ApiProperty({
        example: '10'})
      no_of_lesson:number;

      @IsString()
      @ApiProperty({
        example:"this is course for kids",
      })
      key_points:string;

      @IsString()
      @ApiProperty({
        example:"beginner|intermediate|expert",
      })
      level:string;

      @ApiProperty({ description: '1|0' })
      @IsNumber()
      @IsNotEmpty()
      status: number;

}