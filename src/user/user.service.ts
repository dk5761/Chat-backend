import { Injectable } from '@nestjs/common';
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
    return await this.userRepo.findOneByEmail({ email });
  }

  async createUser(
    email: string,
    password: string,
    profile: {
      username: string;
      profileImage?: string;
    },
  ): Promise<User> {
    // const profile = {username: "", profileImage: ""}
    return await this.userRepo.createUser({ email, password, profile });
  }

  async updateUser(id: string, data: UserDto): Promise<User> {
    return await this.userRepo.update({ id }, data);
  }

  async deleteUser(id: string) {
    return await this.userRepo.delete({ id });
  }
}
