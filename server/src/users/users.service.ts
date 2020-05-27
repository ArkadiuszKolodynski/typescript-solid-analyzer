import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //TODO: serialize returning objects instead of cast

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const createdUser: User = new this.userModel(createUserDto);
    return (await createdUser.save()) as UserDto;
  }

  async findAll(): Promise<UserDto[]> {
    return (await this.userModel.find()) as UserDto[];
  }

  async findOne(login: string): Promise<UserDto> {
    return (await this.userModel.findOne({ login }).select('login')) as UserDto;
  }
}
