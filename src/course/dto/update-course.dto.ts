import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateCourse{
    @ApiPropertyOptional({
        example: 'course title'})
      @IsString()
      title: string;

      @ApiPropertyOptional({
        example: 'course '})
      @IsString()
      @IsOptional()
      description:string;

      @ApiPropertyOptional({
        example: 'category_id'})
      category: string;
    
      @ApiPropertyOptional({
        example: ['category_id','another_id']})
      sub_category:[];
      
      @IsString()
      @IsOptional()
      user_id:string;

      @IsNumber()
      @ApiPropertyOptional({
        example: '10'})
      no_of_lesson:number;

      @IsString()
      @ApiPropertyOptional({
        example:"this is course for kids",
      })
      key_points:string;

      @IsString()
      @ApiPropertyOptional({
        example:"beginner|intermediate|expert",
      })
      level:string;

      @ApiPropertyOptional({ description: '1|0' })
      @IsNumber()
      status: number;

      @ApiPropertyOptional({ description: 'Path to the profile pic file', type: 'string', format: 'binary' })
      @IsString()
      @IsOptional()
      image?: string;

}