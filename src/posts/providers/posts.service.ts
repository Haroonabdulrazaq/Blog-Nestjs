import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Create MetaOptions
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }
    // Create Post
    const newPost = this.postRepository.create(createPostDto);
    if (metaOptions) {
      newPost.metaOptions = metaOptions;
    }

    // Return Post to client
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
