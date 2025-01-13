import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) console.log('User already exist');
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  public findAll() {
    return 'All users';
  }

  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alex',
      lastName: 'Wallace',
      email: 'Alexwallace@mail.com',
    };
  }
}
