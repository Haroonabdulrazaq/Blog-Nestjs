import { Injectable } from '@nestjs/common';
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
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Create Post
    const newPost = this.postRepository.create(createPostDto);

    // Return Post to client
    const response = await this.postRepository.save(newPost);

    return response;
  }

  public findAll() {
    const posts = this.postRepository.find();
    return posts;
  }

  public async delete(id: number) {
    // Delete the post
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}

// Note: Foriegn Key will stop us from deleteing an Object until we have delete all the objects it reference
// Check - Udemy
// NestJS Masterclass - NodeJS Framework Backend Development
//  Video 85 Cascade Delete Bi-directional Relationship
