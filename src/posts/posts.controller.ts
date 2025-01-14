import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-posts.dto';
import { PatchPostsDto } from './dto/patch-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 201,
    description: 'Your post is created successfully!',
  })
  @ApiOperation({ summary: 'Create a new blog post' })
  @Post('/')
  public async createPosts(@Body() createPostsDto: CreatePostDto) {
    const response = await this.postsService.create(createPostsDto);
    return response;
  }

  @Get('/:userId?')
  public getPost(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
  @ApiResponse({
    status: 200,
    description: 'Your post is updated successfully!',
  })
  @ApiOperation({ summary: 'Update an existing blog post' })
  @Patch()
  public UpdatePost(@Body() patchPostsDto: PatchPostsDto) {
    console.log(patchPostsDto);
  }
}
