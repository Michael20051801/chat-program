import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Defining the dto for signing up a new user.
export class SignupDto {
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

  // The userName must not be empty.
  // The userName must be a string.
  @IsString()
  @IsNotEmpty()
  userName: string
}
