import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';

// Defining A service with the name of AuthService.
// It's injectable.
@Injectable()
export class AuthService {

  // In the constructor it has PrismaService, so I can use prisma
  //  in my code here.
  constructor(
    private prisma: PrismaService,
  ) {}

  async signup(dto: SignupDto) {

    // I use Argon to hash the the user's password.
    const hash = await argon.hash(dto.password);

    try {
      // Prisma tries to create a new user in the database.
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          userName: dto.userName,
        },

        // I don't need to return the hash, I have no use in it.
        select: {
          description: true,
          email: true,
          id: true,
          userName: true,
          status: false,
          hash: false,
        },
      });
      // returns the new created user
      return user;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {

          // If the email already exists in the system, throw an 403 error
          // with suited message and do not create the user.
          throw new ForbiddenException(
            'The given email is already exists in the system, please log in or use a different email.'
          );
        }
      }
      // If the error is not about the already exists email, throw it also.
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const email = dto.email;
    
    // Prisma tries to find a user in the database, 
    //  according to the email in the dto of the input.
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },

      select: {
        description: true,
        email: true,
        id: true,
        userName: true,
        status: false,
        hash: true,
      },
    });

    // If the email does not exists in the system, throw an 403 error
    //  with suited message and do not return the user.
    if (!user)
      throw new ForbiddenException(
        'The given email does not exist in the system.'
      );

    // Veryfies if the given password match the hashed password in
    //  the database.
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If the passwords do not natch. throw an 403 error 
    //  with suited message and do not return the user.
    if (!pwMatches) {
      throw new ForbiddenException('Incorrect password.');
    }

    // I don't need to return the hash, I have no use in it.
    // I'm unselecting it here and not earlier brcause I had
    //  to make sure the passwords are matching.
    delete user.hash;

    // returns the found user.
    return user;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: false,
      },
    })
  }
}