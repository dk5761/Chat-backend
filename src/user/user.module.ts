import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repo';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileRepository } from './profile.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: Profile.name, schema: ProfileSchema}
    ])
  ],
  providers: [UserService,  UserRepository, ProfileRepository],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
