import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategory {
  @ApiProperty({
    example: 'Category title'})
  @IsNotEmpty()
  @IsEmail()
  title: string;

  @IsString()
  @IsOptional()
  user_id:string;

}
