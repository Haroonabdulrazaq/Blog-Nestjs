import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    const newPost = await this.postRepository.create(createPostDto);
    const response = await this.postRepository.save(newPost);

    return response;
  }
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
