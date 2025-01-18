import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUserDto } from '../dto/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    /**
     *Inject a DataSource from typeORM
     */
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUserDto: CreateManyUserDto) {
    const newUsers: User[] = [];
    // Create a Query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect the instance to Datasource
      await queryRunner.connect();
      // Start with the transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Your request could not be completed at this time',
        {
          description: `Error occured, Could not conneuct to the DB, ${error}`,
        },
      );
    }

    try {
      for (const user of createManyUserDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const saveUser = await queryRunner.manager.save(newUser);
        newUsers.push(saveUser);
      }
      // if Successful Commit to the DB
      await queryRunner.commitTransaction();
    } catch (error) {
      // if not unsuccessful rollback changes
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        'Could not complete the transaction at this time',
        {
          description: `Error occured while saving the users to DB, ${error}`,
        },
      );
    } finally {
      // Release connection
      await queryRunner.release();
    }
    return newUsers;
  }
}

// Transaction should be use only when there is a need to save multiple data or changes into the DB
// Else use the normal Repository pattern.
