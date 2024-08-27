import {
  IsAlphanumeric ,
  IsArray,
  IsEmail ,
  IsEnum,
  IsNotEmpty ,
  IsNumber ,
  IsOptional,
  IsString , Validate ,
} from 'class-validator';
import { IsUnique } from "../../shared/validation/is-unique";
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Query } from '@nestjs/common';
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
  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     Role
  //   },
  // })
  // role: Role;
  // @ApiProperty({
  //   example: ['admin', 'user'],
  //   description: 'Array of roles',
  //   type: 'array',
  //   items: {
  //     type: 'string',
  //     enum: Object.values(Role), // Convert enum to an array of values
  //   },
  //   required: false,
  // })
  // @IsOptional()
  // @IsArray()
  // @IsEnum(Role, { each: true })
  // role?: Role;
 
  @ApiProperty({
    example: 'hello world!',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  description: string;
}
