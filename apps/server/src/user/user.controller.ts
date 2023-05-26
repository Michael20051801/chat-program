import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtAtGuard } from '../auth/guard';
import { EditUserDto } from './dto';

// @UseGuards(JwtAtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('me')
  getUserIdByEmail(@Body() body: { userEmail: string }) {
    return this.userService.getUserIdByEmail(body);
  }

  // Create a dto that receive the userId
  @Get('contacts')
  getContacts() {
    return this.userService.getContacts();
  }

  @Post('allUsers')
  getAllUsers(@Body() body: {userId: string}) {
    return this.userService.getAllUsers(body);
  }

}
