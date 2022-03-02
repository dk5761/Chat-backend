import {
  Param,
  Controller,
  Get,
  Post,
  NotFoundException,
  Body,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //get user details
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req: any): Promise<Partial<User>> {
    // console.log(req);
    const user = await this.userService.getUserById(req.user.id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('ping')
  async ping(@Request() req: any) {
    // console.log('ping');
    return { message: 'pinged' };
  }

  //update user profile
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req: any, @Body() body: UserDto) {
    // console.log('inside put');
    return await this.userService.updateUser(req.user.id, body);
  }

  // //delete user
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req: any) {
    const user = await this.userService.deleteUser(req.user.id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  async getUserByUsername(@Param('username') username: string) {
    // console.log(req);
    const userList = await this.userService.getUserByUsername(username);
    if (userList === []) {
      throw new NotFoundException('user not found');
    }
    // console.log('the user : ', userList);
    return userList;
  }

  @UseGuards(JwtAuthGuard)
  @Get('byID/:id')
  async getUserById(@Param('id') id: string) {
    // console.log(req);
    const user = await this.userService.getUserById(id);
    // console.log('the user : ', userList);
    return user;
  }
}
