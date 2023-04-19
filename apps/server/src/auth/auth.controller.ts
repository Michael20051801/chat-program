import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
import { JwtAtGuard, JwtRtGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup/local') // /auth/signup/local
  signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/local') // /auth/login/local
  loginEmailLocal(@Body() dto: SigninViaEmailDto): Promise<Tokens> {
    return this.authService.loginEmailLocal(dto);
  }

  // @Post('signup/google')
  // signupGoogle(): Promise<Tokens> {
  //   return this.authService.signupGoogle();
  // }

  // @Post('login/google')
  // loginGoogle(): Promise<Tokens> {
  //   return this.authService.loginGoogle();
  // }

  // @Post('/local/login/phone')
  // loginPhone(@Body() dto: SigninViaPhoneNumberDto) {
  //   return this.authService.loginPhone(dto);
  // }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@GetUser('sub') userId: number, @GetUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
