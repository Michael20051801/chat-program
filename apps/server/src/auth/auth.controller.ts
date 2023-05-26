import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { GoogleGuard, JwtAtGuard, JwtRtGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // /auth/signup
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login') // /auth/login
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
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

  // @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetUser('id') userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  // @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @GetUser('id') userId: string,
    @GetUser('refreshToken') refreshToken: string
  ): Promise<string> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
