import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dto/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();

    if (!isAuth) throw new UnauthorizedException();
    console.log(isAuth);

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
  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alex',
      lastName: 'Wallace',
      email: 'Alexwallace@mail.com',
    };
  }
}
