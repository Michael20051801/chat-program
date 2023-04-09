import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

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
      return this.signToken(user.id, user.email); //?
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'The given email is already exists in the system, please log in or use a different email.'
          );
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

    if (!user)
      throw new ForbiddenException(
        'The given email does not exist in the system.'
      );

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Incorrect password.');

    delete user.hash;
    return this.signToken(user.id, user.email);
  }

  // async loginPhone(dto: SigninViaPhoneNumberDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.phoneNumber,
  //     },
  //   });

  //   if (!user) throw new ForbiddenException('Credentials are incorrect');

  //   const pwMatches = await argon.verify(user.hash, dto.password);

  //   if (!pwMatches) throw new ForbiddenException('Credentials are incorrect');

  //   delete user.hash;
  //   return this.signToken(userId, user.phoneNumber);
  // }

  async signToken(
    userId: number,
    email: string
    // phoneNumber?: number
  ): Promise<{ access_token: string }> {
    let payload;
    if (email) {
      payload = {
        sub: userId,
        email,
      };
    }
    // else if (phoneNumber) {
    //   payload = {
    //     sub: userId,
    //     phoneNumber,
    //   };
    // }

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
