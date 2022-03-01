import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: User) {
    const user = new this.userModel(data);
    return await user.save();
  }

  async findOne(query: any): Promise<User> {
    return await this.userModel.findById({ _id: query.id }).lean();
  }

  async findOneByQuery(query: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne({ email: query.email }).lean();
  }

  async findByUsername(query: FilterQuery<User>) {
    //prettier-ignore
    return await this.userModel.find(
      { 
        username: {$regex: new RegExp(query.username, 'i')}
       }
    ).select(['-password', '-socketId', '-__v']).lean()
  }

  async update(query: FilterQuery<User>, user: Partial<User>): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate({ _id: query.id }, user)
      .lean();
  }

  async delete(query: FilterQuery<User>) {
    return await this.userModel.findByIdAndDelete({ _id: query.id }).lean();
  }
}
