import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dto/get-users-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    if (getUserParamDto) {
      console.log('im ', getUserParamDto);
      console.log('im ', getUserParamDto);
    }
    if (limit) {
      console.log('im limit', limit);
    }
    if (page) {
      console.log('im page', page);
    }
    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'Johndoe@mail.com',
      },
      {
        firstName: 'Alex',
        lastName: 'Wallace',
        email: 'Alexwallace@mail.com',
      },
    ];
  }
  public findOneById(id: number) {
    return {
      id,
      firstName: 'Alex',
      lastName: 'Wallace',
      email: 'Alexwallace@mail.com',
    };
  }
}
