import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { error } from 'console';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async postMessage(body: {newMessage: CreateMessageDto}) {
    console.log({...body.newMessage,});
    const receiver = await this.prisma.user.findFirst({
      where: {
        id: body.newMessage.receiverId,
      },
    });
    if (!receiver) throw new ForbiddenException('The user was not found!');

    try {
      const message = await this.prisma.message.create({
        data: {
          content: body.newMessage.content,
          receiverId: body.newMessage.receiverId,
          senderId: body.newMessage.senderId,
        },
      });
      console.log({message});
      // return message;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMessages(body: {otherUserId: string, currentUserId: string}) {
    const receivedMessages = await this.prisma.message.findMany({
      where: {
        AND: [{senderId: body.otherUserId}, {receiverId: body.currentUserId}],
      },
    });
    console.log({receivedMessages});
    console.log(body);

    const sentMessages = await this.prisma.message.findMany({
      where: {
        AND: [{senderId: body.currentUserId}, {receiverId: body.otherUserId}],
      },
    });
    
    // console.log(typeof (sentMessages[0].sent))
    console.log({sentMessages});

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

    if(sentMessages !== undefined && receivedMessages !== undefined) {
      const allMessages = sentMessages.concat(receivedMessages);
      allMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return allMessages;
    }
    else if(sentMessages !== undefined && receivedMessages === undefined) {
      sentMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return sentMessages;
    }
    else if(receivedMessages !== undefined && sentMessages === undefined) {
      receivedMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return receivedMessages;
    }
    else {
      return [];
    }

  }
}
