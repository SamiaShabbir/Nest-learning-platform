import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  DoB: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @IsNotEmpty()
  @IsString()
  role_id: string;
}
