import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBlogLike {
  @ApiProperty({
    example: '3432432423uiiuuy'})
  @IsNotEmpty()
  @IsString()  
  BlogId: string;
}
