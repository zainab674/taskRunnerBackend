import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';

import { Socket, SocketSchema } from './socket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MyGateway } from './gateway';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/configuration/app.config';
import { UserModule } from '../user/user.module';
import { SocketController } from './socket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Socket.name, schema: SocketSchema }]),
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: AppConfig.authConfig.publicKey,
        signOptions: {
          // expiresIn: AppConfig.authConfig.jwtExpirationTime,
        },
      }),
    }),
    UserModule
  ],
  controllers: [SocketController],
  providers: [SocketService, MyGateway, AuthService, JwtStrategy],
  exports: [SocketService],
})
export class SocketModule { }
