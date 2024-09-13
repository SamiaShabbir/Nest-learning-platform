import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSubCategory {
  @ApiProperty({
    example: 'Category title'})
  @IsNotEmpty()
  @IsEmail()
  title: string;

  @ApiProperty({
    example: 'Category id'})
  @IsString()
  @IsOptional()
  category_id:string;
  
  @IsString()
  @IsOptional()
  user_id:any;
}
