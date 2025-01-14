import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from '../enums/postType.enum';
import { Status } from '../enums/status.enum';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
// import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 512,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.DRAFT,
  })
  status: Status;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImagUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(() => MetaOption)
  @JoinColumn()
  metaOptions?: MetaOption;

  // @Column({

  // })
  // tags?: string[];

  // @Column()
}
