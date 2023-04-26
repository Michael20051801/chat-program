import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      clientID: config.get<string>('CLIENT_ID'),
      clientSecret: config.get<string>('CLIENT_SECRET'),
      callbackURL: config.get<string>('CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  validate(access_token: string, refresh_token: string, profile: Profile) {
    console.log({
        access_token,
        refresh_token,
        profile,
        email: profile.emails[0].value,
        userName: profile.displayName,
    });
    return {
      profile,
    }
  }
}
