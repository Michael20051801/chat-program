import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtAtGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  postMessage(@GetUser('sub') userId: string, @Body() body: CreateMessageDto) {
    return this.messageService.postMessage(userId, body);
  }
}
