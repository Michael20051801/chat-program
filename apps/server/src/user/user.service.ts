import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as argon from 'argon2';

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
        receivedMessages: {
          include: { sender: { select: { id: true, email: true } } },
        },
        sentMessages: {
          include: { receiver: { select: { id: true, email: true } } },
        },
      },
    });
    return users;
  }

  async changeDesc(body: { userId: string; description: string }) {
    await this.prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        description: body.description,
      },
    });
  }

  async changePassword(body: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const newHash = await argon.hash(body.newPassword);

    const user = await this.prisma.user.findFirst({
      where: {
        id: body.userId,
      },
    });
    if (!user)
      throw new ForbiddenException(
        'Error finding the user in the server'
      );
    const pw = user.hash;
    const pwMatches = await argon.verify(pw, body.currentPassword);

    if (!pwMatches) {
      throw new ForbiddenException('The password you entered does not match the password in the database.');
    }

    await this.prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        hash: newHash,
      },
    });
  }
}
