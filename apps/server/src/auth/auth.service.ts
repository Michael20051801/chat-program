import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninViaEmailDto, SigninViaPhoneNumberDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { JwtAtGuard, JwtRtGuard } from './guard';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signupLocal(dto: SignupDto): Promise<Tokens> {
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
      const tokens = await this.getTokens(user.id, user.email); //?
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
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

  async loginEmailLocal(dto: SigninViaEmailDto) {
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
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
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
  //   return this.getTokens(userId, user.phoneNumber);
  // }

  
  async logout(userId: number) {
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

  
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user){
      throw new ForbiddenException(
        'Access Denied.'
      );
    }
    const userRt = user.hashedRt;

    const rtMatches = await argon.verify(user.hashedRt, rt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }




  async getTokens(
    userId: number,
    email: string
    // phoneNumber?: number
  ): Promise<Tokens> {
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
    const secretAt = this.config.get('JWT_AT_SECRET');
    const secretRt = this.config.get('JWT_RT_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secretAt,
      }),

      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: secretRt,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
