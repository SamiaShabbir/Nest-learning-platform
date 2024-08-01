import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsAlphanumeric()
  password: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  last_name: string;
  @IsOptional()
  DoB: string;
  @IsOptional()
  @IsNumber()
  age: number;
  @IsOptional()
  @IsString()
  role_id: string;
}
