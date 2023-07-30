import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { compare } from 'bcryptjs';
import { BAD_CREDENTIALS } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService) {}

  async checkPassword(inputPassword: string, userPassword: string): Promise<void> {
    const isPasswordCorrect = await compare(inputPassword, userPassword);
    if (!isPasswordCorrect) throw new HttpException(BAD_CREDENTIALS, HttpStatus.BAD_REQUEST);
  }

  async login(email: string): Promise<Object> {
    const payload = { email };
    return {
      accest_token: await this.jwtService.signAsync(payload)
    };
  }
}
