import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // /auth/signup
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  // /auth/login
  @Post('login')

  @Post('login/email')
  loginEmail(@Body() dto: SigninViaEmailDto) {
    return this.authService.loginEmail(dto);
  }

  @Post('login/phone')
  loginPhone(@Body() dto: SigninViaPhoneNumberDto) {
    return this.authService.loginPhone(dto);
  }
}
