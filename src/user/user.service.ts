import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserById(id: string) {
    console.log(id);
    const user = await this.userRepo.findOne({ id });

    if (user) {
      const { password, ...rest } = user;

      return rest;
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOneByQuery({ email });
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findByUsername({ username });
    console.log(user);
    return user;
  }

  async createUser(
    email: string,
    password: string,
    username: string,
    profileImage?: string,
  ): Promise<User> {
    return await this.userRepo.createUser({
      email,
      password,
      username,
    });
  }

  async updateUser(id: string, data: UserDto): Promise<User> {
    return await this.userRepo.update({ id }, data);
  }

  async deleteUser(id: string) {
    return await this.userRepo.delete({ id });
  }

  async saveSocketUser(id: any, socketId: string) {
    console.log(id);
    return await this.userRepo.update({ id }, { socketId });
  }
}
