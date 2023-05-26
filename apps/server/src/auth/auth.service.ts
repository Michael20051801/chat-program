import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtAtGuard, JwtRtGuard } from './guard';
import axios from 'axios';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
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
        select: {
          createdAt: false,
          updatedAt: false,
          hashedRt: false,
          description: true,
          email: true,
          id: true,
          userName: true,
          hash: true,
        },
      });

      delete user.hash;

      const token = await this.getToken(user.id, user.email); //?
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      return {
        user,
        token,
      };
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

  async login(dto: LoginDto) {
    const email = dto.email;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        createdAt: false,
        updatedAt: false,
        hashedRt: false,
        description: true,
        email: true,
        id: true,
        userName: true,
        hash: true,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'The given email does not exist in the system.'
      );

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect password.');
    }

    delete user.hash;

    const token = await this.getToken(user.id, user.email); //?
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    return {
      user,
      token,
    };
  }

  // async signupGoogle(profile: object) {
  //   return {
  //     msg: 'Success!',
  //   };
  // }

  // async loginGoogle(code: string) {
  //   return {
  //     msg: 'Success!',
  //   };
  // }

  // async googleRedirect() {
  //   return {
  //     msg: 'Success!',
  //   };
  // }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied.');
    }

    const rtMatches = await argon.verify(user.hashedRt, rt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getToken(user.id, user.email);
    return tokens;
  }

  async getToken(
    userId: string,
    email: string
    // phoneNumber?: number
  ): Promise<string> {
    let payload;
    if (email) {
      payload = {
        id: userId,
        email,
      };
    }
    // else if (phoneNumber) {
    //   payload = {
    //     sub: userId,
    //     phoneNumber,
    //   };
    // }
    const secretAt = this.config.get('JWT_AT_SECRET');

    const at = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secretAt,
    });

    return at;
  }

  // async updateRtHash(userId: string, rt: string) {
  //   const hash = await argon.hash(rt);
  //   await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       hashedRt: hash,
  //     },
  //   });
  // }
}
