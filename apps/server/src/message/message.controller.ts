import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  postMessage(@Body() body: CreateMessageDto) {
    return this.messageService.postMessage(body);
  }
}
