import { Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';

// Defining a controller, that its path name will be '/users'.
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Defining an HTTP method GET that will be activated at this path.
  @Get('contacts')

  // Defining a function that will be activated when accessing its path.
  getContacts() {

    // Rerurning the function 'getContacts' in the auth service.s
    return this.userService.getContacts();
  }

  @Post('status')
  setStatus(@Body() body: {userId: string, status: boolean}) {
    return this.userService.setStatus(body);
  }

  @Get('status')
  getStatus(@Body() userId: string) {
    return this.userService.getStatus(userId);
  }
}
