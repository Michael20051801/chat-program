import { IsNotEmpty, IsString } from 'class-validator';

export class SigninViaPhoneNumberDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
