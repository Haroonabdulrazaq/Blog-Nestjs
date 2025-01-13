import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { Status } from '../enums/status.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostsDto {
  @ApiProperty({
    description: 'This is the Post title',
    example: 'First title',
  })
  @IsString()
  @Length(3, 96)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values are: post, page, stroy, series',
    example: 'story',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'This is the Post slug',
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: Status,
    description: 'Possible values are: draft, scheduled, review, published',
    example: 'draft',
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @ApiPropertyOptional({
    description: 'This is the post content',
    example: 'This is the content of the first post',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{\r\n    "@context": "https:\/\/schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @IsUrl()
  featuredImagUrl?: string;

  @ApiProperty({
    description: 'This is the post published date',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  publishOn: Date;

  @ApiPropertyOptional({
    description: 'An Array of tags passed as string values',
    example: ['Typescript', 'NestJS'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'The can be an identifier for your meta option',
          example: 'sideBarEnabled',
        },
        value: {
          type: 'any',
          description: 'The value can be of any type',
          example: true,
        },
      },
    },
    description: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
