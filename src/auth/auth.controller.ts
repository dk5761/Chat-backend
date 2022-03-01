import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Get,
  Logger,
} from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger: Logger = new Logger('AppGateway');
  //sign in
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any, @Res() res: Response) {
    this.logger.log('Logged IN User: ', req.user.email);
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
