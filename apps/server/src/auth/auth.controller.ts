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

  @Post('local/signup') // /auth/local/signup
  signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/login') // /auth/local/login
  loginEmailLocal(@Body() dto: SigninViaEmailDto): Promise<Tokens> {
    return this.authService.loginEmailLocal(dto);
  }

  // @Post('/local/login/phone')
  // loginPhone(@Body() dto: SigninViaPhoneNumberDto) {
  //   return this.authService.loginPhone(dto);
  // }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetUser('id') userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@GetUser('sub') userId: number, @GetUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
