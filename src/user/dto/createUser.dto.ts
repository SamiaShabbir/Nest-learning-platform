import {
  IsAlphanumeric ,
  IsEmail ,
  IsNotEmpty ,
  IsNumber ,
  IsString , Validate ,
} from 'class-validator';
import { IsUnique } from "../../shared/validation/is-unique";
import { ApiProperty } from '@nestjs/swagger';
const Model="User";
export class CreateUserDto {
  @ApiProperty({
    example: 'myname',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  username: string;
  @ApiProperty({
    example: 'password1234',
    required: true
 })
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'example.user@gmail.com',
    required: true
 })
  // @Validate(IsUniqueConstraint)
  @IsUnique({tableName:Model})
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  @ApiProperty({
    example: 'Marcelo',
    required: true
 })
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  @ApiProperty({
    example: 'Meeks',
    required: true
 })
  last_name: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '12/3/2000',
    required: true
 })
  DoB: string;
  @ApiProperty({
    example: '12',
    required: true
 })
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @ApiProperty({
    example: '66c4aa20a62061fd53c09e64',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  role_id: string;
  @ApiProperty({
    example: 'hello world!',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  description: string;
}
