import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export enum PostType {
  Post = 'post',
  Page = 'page',
  Story = 'story',
  Series = 'series',
}

export enum Status {
  draft = 'draft',
  scheduled = 'scheduled',
  review = 'review',
  published = 'published',
}

export class CreatePostsDto {
  @IsNotEmpty()
  @Length(3, 96)
  title: string;

  @IsNotEmpty()
  @IsEnum(PostType)
  postType: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  schema: string;

  @IsOptional()
  @IsString()
  featuredImagUrl: string;

  @IsString()
  publishOn: string;

  @IsNotEmpty()
  tags: string[];
}
