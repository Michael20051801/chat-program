import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';
import { Tokens } from './types';
import { Request, request } from 'express';
import { GoogleGuard, JwtAtGuard, JwtRtGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup/local') // /auth/signup/local
  signupLocal(@Body() dto: SignupDto) {
    return this.authService.signupLocal(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/local') // /auth/login/local
  loginEmailLocal(@Body() signinViaEmailDto: SigninViaEmailDto) {
    return this.authService.loginEmailLocal(signinViaEmailDto);
  }



  // @Post('signup/google')
  // signupGoogle(): Promise<Tokens> {
  //   return this.authService.signupGoogle();
  // }
  // @UseGuards(GoogleGuard)
  // @Get('signup/google')
  // signupGoogle(@GetUser('profile') profile: object) {
  //   return this.authService.signupGoogle(profile);
  // }

  // @UseGuards(GoogleGuard)
  // @Get('login/google')
  // loginGoogle(@GetUser('profile') profile: object) {
  //   return this.authService.loginGoogle(profile);
  // }

  // @Post('login/google')
  // loginGoogle(@Body() code: string) {
  //   return this.authService.loginGoogle(code);
  // }

  // @UseGuards(GoogleGuard)
  // @Get('/google/redirect')
  // googleRedirect() {
  //   return this.authService.googleRedirect();
  // }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetUser('sub') userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @GetUser('sub') userId: string,
    @GetUser('refreshToken') refreshToken: string
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
