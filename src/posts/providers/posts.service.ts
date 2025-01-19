import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostsDto } from '../dto/patch-posts.dto';
import { GetPostsDto } from '../dto/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    private readonly paginationProvider: PaginationProvider,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Find author from DB based on authorId
    const author = await this.userService.findOneById(createPostDto.authorId);
    const tags = await this.tagsService.findMultipleTagById(createPostDto.tags);
    // Create Post
    const newPost = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    // Return Post to client

    const response = await this.postRepository.save(newPost);

    return response;
  }

  public findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    console.log(userId);

    const posts = this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );

    return posts;
  }

  public async update(patchPostDto: PatchPostsDto) {
    let tags = undefined;
    try {
      tags = await this.tagsService.findMultipleTagById(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException('Request timed out, Try again later', {
        description: 'unable to find tags in DB',
        cause: error,
      });
    }
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag Ids and nesure they are correct',
      );
    }

    //Post
    let post = undefined;
    try {
      post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again',
        {
          description: `Error connecting to the DB, ${error}`,
        },
      );
    }

    if (!post) {
      throw new BadRequestException('Invalid post id');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImagUrl = patchPostDto.featuredImagUrl ?? post.featuredImagUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // Update the tags
    post.tags = tags;

    let newPost;
    try {
      newPost = await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again',
        {
          description: `Error connecting to the DB, ${error}`,
        },
      );
    }

    return newPost;
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
