import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-posts.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data-interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly userService: UsersService,
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    try {
      // Find author from DB based on authorId
      author = await this.userService.findOneById(user.sub);
      tags = await this.tagsService.findMultipleTagById(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (!tags || createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please chack your tag Ids');
    }
    // Create Post
    const newPost = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    // Return Post to client

    try {
      return await this.postRepository.save(newPost);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and its not a duplicate',
      });
    }
  }
}
