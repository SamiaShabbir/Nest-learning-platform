import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBlog {
  @ApiProperty({
    example: 'Blog Body'})
  @IsNotEmpty()
  @IsEmail()
  body: string;

  @IsString()
  @IsOptional()
  user_id:string;

}
