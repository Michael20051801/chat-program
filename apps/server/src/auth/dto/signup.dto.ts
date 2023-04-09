import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string

  // @IsNumberString()
  // @IsNotEmpty()
  // phoneNumber: string
}
