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
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }

  public isAuth() {
    return true;
  }
}
