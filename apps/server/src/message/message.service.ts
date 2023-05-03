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
          userId,
          ...body,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    return body;
  }

  async getMessages(userId: string) {
    const user = this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('The user does not exist');

    return user.Message;
  }
}
