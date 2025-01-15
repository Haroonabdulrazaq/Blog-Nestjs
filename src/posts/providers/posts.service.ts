import { Injectable } from '@nestjs/common';
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

  public async create(createPostDto: CreatePostDto) {
    // Find author from DB based on authorId
    const author = await this.userService.findOneById(createPostDto.authorId);
    // Create Post
    const newPost = this.postRepository.create({ ...createPostDto, author });
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
