import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Defining a module with the name of Prisma.
// It is defined globally.
// Its provider is PrismaService, and it 
//  also exports it.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
