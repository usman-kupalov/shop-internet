import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User, AuthSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: AuthSchema,
        collection: 'User'
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    PassportModule
  ],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
