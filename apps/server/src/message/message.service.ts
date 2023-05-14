import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { error } from 'console';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async postMessage(userId: string, body: CreateMessageDto) {
    console.log({ ...body, userId });
    try {
      await this.prisma.message.create({
        data: {
          senderId: userId,
          ...body,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    return body;
  }

  async getMessages(userId: string, body: { otherUserId: string }) {
    const receivedMessages = this.prisma.message.findMany({
      where: {
        senderId: body.otherUserId,
        receiverId: userId,
      }
    })

    const sentMessages = this.prisma.message.findMany({
      where: {
        senderId: userId,
        receiverId: body.otherUserId,
      }
    })
    
    // const sender = this.prisma.user.findUnique({
    //   where: {
    //     id: senderId,
    //   },
    // });
    // if (!sender) throw new ForbiddenException('The user does not exist');
    // const sentMessages = this.prisma.user.findMany({
    //   where: {
        
    //   }
    // })
    

    return receivedMessages || sentMessages;
  }
}
