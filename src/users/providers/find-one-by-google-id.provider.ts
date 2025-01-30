import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneByGoogleId(googleId: string) {
    return await this.userRepository.findOneBy({ googleId });
  }
}
