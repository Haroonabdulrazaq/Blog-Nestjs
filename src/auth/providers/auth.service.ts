import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);

    let result: boolean = false;
    try {
      result = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Could not complete your request at this moment',
        {
          description: `Request timeout, ${error}`,
        },
      );
    }
    if (!result) {
      throw new BadRequestException('Invalid Email or Password');
    }

    return result;
  }

  public isAuth() {
    return true;
  }
}
