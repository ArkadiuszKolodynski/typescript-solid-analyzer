import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: User = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOne(login: string): Promise<User> {
    return await this.userModel.findOne({ login }).select('login');
  }
}
