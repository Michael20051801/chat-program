import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserIdByEmail(body: { userEmail: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: body.userEmail,
      },
    });
    if (!user)
      throw new ForbiddenException('The user does not exist in the system.');
    return user.id;
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async getContacts() {
    const users = await this.prisma.user.findMany({
      include: {
        receivedMessages: { include: { sender: { select: { id: true, email: true } } } },
        sentMessages: { include: { receiver: { select: { id: true, email: true } } } },
      },
    });
    return users;
    // const users = await this.prisma.user.findMany({
    //   include: {
    //     receivedMessages: {
    //       // where: {
    //       //   receiverId: body.userId,
    //       // },
    //       include: {
    //         sender: {
    //           select: {
    //             id: true,
    //           },
    //         },
    //       },
    //     },
    //     sentMessages: {
    //       // where: {
    //       //   senderId: body.userId,
    //       // },
    //       include: {
    //         receiver: {
    //           select: {
    //             id: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    // return users;
  }

  async getAllUsers(body: {userId: string}) {
    const allUsers = await this.prisma.user.findMany({
      where: {
        NOT: {
          id: body.userId,
        },
      },
    });
    return allUsers;
  }
}
