import { Controller } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
