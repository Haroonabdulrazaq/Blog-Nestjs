import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(@Body() createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again',
        {
          description: `Error connecting to the DB, ${error}`,
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'User with this email already exist, please check your email',
      );
    }
    let newUser = this.usersRepository.create(createUserDto);
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again',
        {
          description: `Error connecting to the DB, ${error}`,
        },
      );
    }
    return newUser;
  }

  public findAll() {
    return 'All users';
  }

  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again',
        {
          description: `Error connecting to the DB, ${error}`,
        },
      );
    }
    if (!user) {
      throw new NotFoundException('User not found', {
        description: 'User cannot be found in the Database',
      });
    }
    return user;
  }
}
