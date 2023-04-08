import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          userName: dto.userName,
        },
      });

      delete user.hash;
      return user;
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are already taken');
        }
      }
      throw error;
    }
    
    
  }

  async loginEmail(dto: SigninViaEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials are incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials are incorrect');


    delete user.hash;
    return user;
  }

  async loginPhone(dto: SigninViaPhoneNumberDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.phoneNumber,
      },
    });

    if (!user) throw new ForbiddenException('Credentials are incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials are incorrect');


    delete user.hash;
    return user;
  }
}
