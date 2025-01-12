import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostsDto } from './dto/create-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  public createPosts(@Body() createPostsDto: CreatePostsDto) {
    return createPostsDto;
  }

  @Get('/:userId?')
  public getPost(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
