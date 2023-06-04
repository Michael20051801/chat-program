import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from '../prisma/prisma.module';

// Defining a module with the name of Message.
// It imports Prisma module, its controller is MessageController,
//  its provider is MessageService.
@Module({
  imports: [PrismaModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [],
})
export class MessageModule {}
