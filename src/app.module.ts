import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TwilioModule } from 'nestjs-twilio';
import { ChatGateway } from './sockets/gateway';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://Darshan:NanatsuXIV@cluster0.zjib5.mongodb.net/test',
    ),
    TwilioModule.forRoot({
      accountSid: 'AC2594da8969407bfb3e57bf33364fb168',
      authToken: 'f1e732d37c338d31ac2bba0e55d0e367',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
