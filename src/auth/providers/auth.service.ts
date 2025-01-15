import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    const user = this.userService.findOneById(1234);
    if (!user) throw new NotFoundException();
    console.log(email);
    console.log(password);
    console.log(id);
    return 'Sample_Token';
  }

  public isAuth() {
    return true;
  }
}
