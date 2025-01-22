import {
  IsArray,
  // IsArray,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
  // MinLength,
  // ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { Status } from '../enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dto/create-post-meta-options.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the Post title',
    example: 'First title',
  })
  @IsString()
  @Length(3, 512)
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
  @MaxLength(256)
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
  status: Status;

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
  @MaxLength(1024)
  @IsOptional()
  @IsUrl()
  featuredImagUrl?: string;

  @ApiProperty({
    description: 'This is the post published date',
    example: '2024-03-16T07:46:32+0000',
  })
  publishOn: Date;

  @ApiPropertyOptional({
    description: 'Array of ids of tags passed as integers in an array',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"sideBarEnabled": true}',
        },
      },
    },
  })
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
