import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Defining a module with the name of User.
// Its controller is UserController,
//  its provider is UserService.
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
