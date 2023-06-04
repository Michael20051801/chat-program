import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// Defining A service with the name of PrismaService, 
//  it extends PrismaClient.
// It's injectable.
@Injectable()
export class PrismaService
  extends PrismaClient
{
  constructor(private config: ConfigService) {
    super({

      // Defines the db that the prisma interacts with. 
      // The DB's url is stored as an enviromental variable.
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
