import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'signed up' };
  }

  login() {
    return { msg: 'signed in' };
  }
}
