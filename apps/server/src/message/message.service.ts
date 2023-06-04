import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { error } from 'console';

// Defining A service with the name of MessageService.
// It's injectable.
@Injectable()
export class MessageService {

  // In the constructor it has PrismaService, so I can use prisma
  //  in my code here.
  constructor(private prisma: PrismaService) {}

  async postMessage(body: {newMessage: CreateMessageDto}) {

    // Prisma tries to find a user in the database, 
    //  according to the receivedId in the dto of the input.
    const receiver = await this.prisma.user.findFirst({
      where: {
        id: body.newMessage.receiverId,
      },
    });

    // If the email does not exists in the system, throw an 403 error
    //  with suited message and do not procceed.
    if (!receiver) throw new ForbiddenException('The user was not found!');

    try {
      // Prisma tries to create a new message in the database.
      await this.prisma.message.create({
        data: {
          content: body.newMessage.content,
          receiverId: body.newMessage.receiverId,
          senderId: body.newMessage.senderId,
        },
      });
      // If there is an error, throw it.
    } catch (err) {
      throw error;
    }
  }

  async getMessages(body: {otherUserId: string, currentUserId: string}) {
    // Prisma tries to find recived messages in the database, 
    //  when the senderId is otherUserId and the reciverId
    //  is currentUserId.
    const receivedMessages = await this.prisma.message.findMany({
      where: {
        AND: [{senderId: body.otherUserId}, {receiverId: body.currentUserId}],
      },
    });

    // Prisma tries to find sent messages in the database, 
    //  when the senderId is currentUserId and the reciverId
    //  is otherUserId.
    const sentMessages = await this.prisma.message.findMany({
      where: {
        AND: [{senderId: body.currentUserId}, {receiverId: body.otherUserId}],
      },
    });
    
    // If there is both send and recived messages, combines both
    //  in one array and sort it in chronological order, and returns the array.
    if(sentMessages !== undefined && receivedMessages !== undefined) {
      const allMessages = sentMessages.concat(receivedMessages);
      allMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return allMessages;
    }

    // If there is only sent messages, sorts the array in chronological order, 
    //  and returns the array.
    else if(sentMessages !== undefined && receivedMessages === undefined) {
      sentMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return sentMessages;
    }

    // If there is only received messages, sorts the array in chronological order, 
    //  and returns the array.
    else if(receivedMessages !== undefined && sentMessages === undefined) {
      receivedMessages.sort((msg1, msg2) => {return ((msg1.sent).valueOf() - (msg2.sent).valueOf())});
      return receivedMessages;
    }

    // If there are no messages at all, returns an empty array.
    else {
      return [];
    }
  }
}
