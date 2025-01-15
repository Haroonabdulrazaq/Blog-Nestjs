import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, MetaOption, Tag]),
    UsersModule,
    MetaOptionsModule,
    TagsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
