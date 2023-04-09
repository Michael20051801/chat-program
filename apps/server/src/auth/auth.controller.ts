import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // /auth/signup
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login') // /auth/login
  loginEmail(@Body() dto: SigninViaEmailDto) {
    return this.authService.loginEmail(dto);
  }

  // @Post('login/phone')
  // loginPhone(@Body() dto: SigninViaPhoneNumberDto) {
  //   return this.authService.loginPhone(dto);
  // }
}
