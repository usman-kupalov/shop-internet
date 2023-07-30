import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { RegistrationDto } from './dto/register.dto';
import { hash } from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { USER_ARLEADY_EXIST, USER_NOT_FOUND } from './auth.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser ({ email, password }: RegistrationDto): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hashedPassword
    });
    return newUser.save();
  }

  async findUserByEmail(email: string,): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }

  async hashPassword (password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  async checkUserExistByEmail(email: string,): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) throw new HttpException(USER_ARLEADY_EXIST, HttpStatus.BAD_REQUEST);
  }
}
