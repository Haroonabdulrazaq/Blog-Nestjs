import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostsDto } from '../dto/patch-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
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

  public findAll() {
    const posts = this.postRepository.find({
      relations: ['metaOptions', 'author', 'tags'],
    });
    return posts;
  }

  public async update(patchPostDto: PatchPostsDto) {
    const tags = await this.tagsService.findMultipleTagById(patchPostDto.tags);
    if (!tags) console.log('Handle exception here');
    const post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImagUrl = patchPostDto.featuredImagUrl ?? post.featuredImagUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // Update the tags
    post.tags = tags;

    return await this.postRepository.save(post);
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
