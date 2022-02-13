import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectTwilio() private readonly client: TwilioClient, // remove this
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

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
      username: user.profile.username,
      access_token: await this.jwtService.sign(payload),
    };
  }

  async register(data: {
    email: string;
    password: string;
    profile: {
      username: string;
    };
  }) {
    const user = await this.userService.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    const hashed = await bcrypt.hash(data.password, 9);
    const newUser = await this.userService.createUser(
      data.email,
      hashed,
      data.profile,
    );

    return this.login(newUser);
  }

  async loginViaPhone(data: { phone: string }) {
    try {
      return await this.client.messages.create({
        body: 'test sms',
        from: '+18456533790',
        to: data.phone,
      });
    } catch (e) {
      return e;
    }
  }
}
