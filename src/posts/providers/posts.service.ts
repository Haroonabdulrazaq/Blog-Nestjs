import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}

  public findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    if (!user) throw new NotFoundException();
    const { firstName } = user;
    return [
      {
        title: 'Test title',
        content: 'Test content',
        author: firstName,
      },
      {
        title: 'Test title 2',
        content: 'Test content 2',
        author: firstName,
      },
    ];
  }
}
