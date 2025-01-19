import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-posts.dto';
import { PatchPostsDto } from './dto/patch-posts.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log('************************');
    console.log(userId);
    console.log(postQuery);
    console.log('************************');

    return this.postsService.findAll(postQuery, userId);
  }

  @ApiResponse({
    status: 201,
    description: 'Your post is created successfully!',
  })
  @ApiOperation({ summary: 'Create a new blog post' })
  @Post()
  public async createPosts(@Body() createPostsDto: CreatePostDto) {
    const response = await this.postsService.create(createPostsDto);
    return response;
  }

  // @Get()
  // public getPost() {
  //   return this.postsService.findAll();
  // }

  @ApiResponse({
    status: 200,
    description: 'Your post is updated successfully!',
  })
  @ApiOperation({ summary: 'Update an existing blog post' })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    return this.postsService.update(patchPostsDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Your post is deleted successfully!',
  })
  @ApiOperation({ summary: 'Delete an existing blog post' })
  @Delete(':id')
  public async deletePost(@Param('id') id: number) {
    const response = await this.postsService.delete(id);
    return response;
  }
}
