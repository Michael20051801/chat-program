import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

// Defining a controller, that its path name will be '/auth'.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Defining a sub-path, that its path name will be '/signup'.
  // Defining an HTTP method POST that will be activated at this path.
  @Post('signup')

  // Defining a function that will be activated when accessing its path.
  // The function got a parameter from the body of the request, and its
  //  type is SignupDto.
  signup(@Body() dto: SignupDto) {

    // Rerurning the function 'signup' in the auth service, with the
    //  parameter it got from the outer function.
    return this.authService.signup(dto);
  }

  // Defining a sub-path, that its path name will be '/auth'.
  // Defining an HTTP method POST that will be activated at this path.
  // The return answer's HTTP code will be code 200, insead of the 
  //  default POST's 201.
  @HttpCode(HttpStatus.OK)
  @Post('login')

  // Defining a function that will be activated when accessing its path.
  // The function got a parameter from the body of the request, and its
  //  type is LoginDto.
  login(@Body() dto: LoginDto) {
    
    // Rerurning the function 'login' in the auth service, with the
    //  parameter it got from the outer function.
    return this.authService.login(dto);
  }
}
