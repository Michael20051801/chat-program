import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Defining a module with the name of Auth.
// Its controller is AuthController,
//  its provider is AuthService.
@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
