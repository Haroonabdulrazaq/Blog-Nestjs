import { Column, CreateDateColumn, Entity } from 'typeorm';
import { PostType } from '../enums/postType.enum';
import { Status } from '../enums/status.enum';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';

@Entity('posts')
export class Post {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  title: string;

  @Column({
    type: 'enum',
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    nullable: false,
  })
  status: Status;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 96,
  })
  content?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImagUrl?: string;

  @CreateDateColumn()
  publishOn?: Date;

  tags?: string[];
  metaOptions?: CreatePostMetaOptionsDto[];
}
