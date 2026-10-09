import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // for single data
    const user = new this.userModel(createUserDto);
    return user.save();

    // for multiple data
    // const user = await this.userModel.create(createUserDto);
    // return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel
      .find({
        // age: {
        //   $gte: 20,
        //   $lte: 30,
        // },
        // isPremium: true,
      })
      .lean()
      .exec();
    return users;
  }

  async findOne(id: string): Promise<(User & { _id: Types.ObjectId }) | null> {
    const user = await this.userModel.findById(id).lean().exec();
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<(User & { _id: Types.ObjectId }) | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { returnDocument: 'after' }, // Replaced { new: true }
    );
    return updatedUser;
  }

  async remove(id: string): Promise<(User & { _id: Types.ObjectId }) | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser)
      throw new NotFoundException(`User with id "${id}" not found`);

    return deletedUser;
  }
}
