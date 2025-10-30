import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.userRepository.create({ email, password });

    return this.userRepository.save(user);
  }

  async findOne(id: ObjectId) {
    const user = await this.userRepository.findOneBy({ _id: id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;

    // SAME AS
    // return this.userRepository.findOne({
    //   where: { _id: id },
    // });
  }

  find(email: string) {
    return this.userRepository.find({
      where: { email },
    });

    // SAME AS
    // return this.userRepository.findBy({ email });
  }

  async update(id: ObjectId, payload: Partial<User>) {
    // THIS WILL WORK BUT THE HOOKS WILL NOT EXECUTED
    // return this.userRepository.update(id, payload);

    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    Object.assign(user, payload);
    return this.userRepository.save(user);
  }

  async remove(id: ObjectId) {
    // THIS WILL WORK BUT THE HOOKS WILL NOT EXECUTED
    // return this.userRepository.delete({ _id: id });

    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.remove(user);
  }
}
