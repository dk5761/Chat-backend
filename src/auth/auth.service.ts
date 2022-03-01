import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log(user);
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (user && verifyPassword) {
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }

  async login(user: any) {
    // console.log("payload",user)
    const payload = {
      email: user.email,
      sub: user._id,
    };

    // console.log(await this.jwtService.sign(payload))
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      access_token: await this.jwtService.sign(payload),
    };
  }

  async register(data: { email: string; password: string; username: string }) {
    const user = await this.userService.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const hashed = await bcrypt.hash(data.password, 9);
    const newUser = await this.userService.createUser(
      data.email,
      hashed,
      data.username,
    );

    return this.login(newUser);
  }

  async verify(token) {
    try {
      return await this.jwtService.verify(token, { secret: 'asdasdasdasd' });
    } catch (e: any) {
      console.log('error in verify function :  ', e);
    }
  }
}
