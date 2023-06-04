import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';

// Defining A service with the name of UserService.
// It's injectable.
@Injectable()
export class UserService {

  // In the constructor it has PrismaService, so I can use prisma
  //  in my code here.
  constructor(private prisma: PrismaService) {}

  async getContacts() {
    // Prisma finds all the users in the database, and returns them.
    const users = await this.prisma.user.findMany({
      include: {
        receivedMessages: { include: { sender: { select: { id: true, email: true } } } },
        sentMessages: { include: { receiver: { select: { id: true, email: true } } } },
      },
    });
    return users;
  }

  async setStatus(body: {userId: string, status: boolean}) {
    await this.prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        status: body.status,
      },
    })
  }

  async getStatus(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    return user.status;
  }
}