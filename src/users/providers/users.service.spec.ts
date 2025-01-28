import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserProvider } from './create-user.provider';
// import { CreateUserDto } from '../dto/create-user.dto';

describe('User Service', () => {
  let service: UsersService;

  const mockUsersCreateManyProvider = {
    createMany: jest.fn(),
  };

  const mockFindOneByGoogleIdProvider = {
    findOneByGoogleId: jest.fn(),
  };

  const mockCreateGoogleUserProvider = {
    createGoogleUser: jest.fn(),
  };

  const mockCreateUserProvider = {
    createUser: jest.fn(),
  };
  // const mockCreateUserProvider: Partial<CreateUserProvider> = {
  //   createUser: (createUserDto: CreateUserDto) =>
  //     Promise.resolve({
  //       id: 12,
  //       firstname: createUserDto.firstname,
  //       lastname: createUserDto.lastname,
  //       email: createUserDto.email,
  //       password: createUserDto.password,
  //     }),
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: { mockUsersCreateManyProvider },
        },
        {
          provide: UsersCreateManyProvider,
          useValue: { mockUsersCreateManyProvider },
        },
        {
          provide: FindOneByGoogleIdProvider,
          useValue: { mockFindOneByGoogleIdProvider },
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: { mockCreateGoogleUserProvider },
        },
        {
          provide: CreateUserProvider,
          useValue: { mockCreateUserProvider },
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined"', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined ', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should call createUser on CreateUserProvider ', async () => {
      const user = await service.createUser({
        firstname: 'john',
        lastname: 'Doe',
        email: 'John@mail.com',
        password: 'test123$',
      });
      console.log(user);

      expect(user.firstname).toEqual('john');
      // expect(mockCreateUserProvider.createUser).toHaveBeenCalled();
    });
  });
});
