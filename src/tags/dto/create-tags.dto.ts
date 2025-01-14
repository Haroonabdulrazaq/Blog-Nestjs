import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Post tags text',
    example: ['TypeScript'],
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  @IsString()
  name: string;

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

  @ApiPropertyOptional({
    description: 'Tag description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Tag Schema: it should be a serialized json object',
  })
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Tag featuredImageUrl',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
