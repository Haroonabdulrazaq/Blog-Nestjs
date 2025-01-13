import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostsDto } from './create-posts.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchPostsDto extends PartialType(CreatePostsDto) {
  @ApiProperty({
    description: 'The ID of the post needs to be updated',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
