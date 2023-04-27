import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  postMessage(body: CreateMessageDto) {
    return body;

    // return this.prismaService.message.create({
    //   data: body,
    // });
  }
}
