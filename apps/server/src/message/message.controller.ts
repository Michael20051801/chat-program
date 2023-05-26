import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAtGuard } from '../auth/guard';
import { GetUser, GetUserId } from '../auth/decorator';

// @UseGuards(JwtAtGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('post')
  postMessage(
    @Body() body: {newMessage: CreateMessageDto},
  ) {
    return this.messageService.postMessage(body);
    // return body;
  }

  @Post('get')
  getMessages(
    @Body() body: {otherUserId: string, currentUserId: string},
  ) {
    const otherUserID = body.otherUserId;
    const myUserID = body.currentUserId;
    console.log({otherUserID,})
    console.log({myUserID,})
    return this.messageService.getMessages(body);
  }
}
