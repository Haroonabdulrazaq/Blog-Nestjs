import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUserDto } from '../dto/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findAll() {
    return this.usersRepository.find();
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

  public async findOneByEmail(email: string) {
    let user: User = undefined;
    try {
      user = await this.usersRepository.findOneBy({ email });
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

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }

  public async createMany(createManyUserDto: CreateManyUserDto) {
    return await this.usersCreateManyProvider.createMany(createManyUserDto);
  }
}
