import {Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';


@Injectable()
export class ProfileRepository {

    constructor(
        @InjectModel(Profile.name) private readonly ProfileModel: Model<ProfileDocument>
        ){}


    async createProfile(data: Partial<Profile>){
        const Profile = new this.ProfileModel(data)
        return await Profile.save()     
    }

    async findOne(query: FilterQuery<Profile>): Promise<Profile>{
        return await this.ProfileModel.findOne(query);
    }

    async find(query: FilterQuery<Profile>): Promise<Profile[]>{
        return await this.ProfileModel.find(query);
    }

    async update(query: FilterQuery<Profile>, profile: Partial<Profile>): Promise<Profile>{
        return await this.ProfileModel.findOneAndUpdate(query, profile);
    }

    async delete(query: FilterQuery<Profile>){
        return await this.ProfileModel.deleteOne(query);
    }

}