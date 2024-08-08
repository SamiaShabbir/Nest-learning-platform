import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthPayloadDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
