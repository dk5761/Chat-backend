import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //sign in
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.login(req.user));
  }

  //sign up
  @Post('/register')
  async register(@Body() body: UserDto) {
    const user = await this.authService.register(body);
    return user;
  }
}
