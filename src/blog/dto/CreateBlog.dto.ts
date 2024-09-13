import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBlog {

  @ApiProperty({
    example: 'Blog title'})
  @IsNotEmpty()
   title: string;

  @ApiProperty({
    example: 'Blog Body'})
  @IsNotEmpty()
  body: any;

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
