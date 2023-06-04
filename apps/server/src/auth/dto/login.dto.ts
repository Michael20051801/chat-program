import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Defining the dto for logging in an existing user.
export class LoginDto {
  // The email must not be empty.
  // The email must be a string.
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // The password must not be empty.
  // The password must be a string.
  @IsString()
  @IsNotEmpty()
  password: string;
}