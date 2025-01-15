import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tags.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }

  @Delete(':id/soft-delete')
  public async softDelete(@Param('id') id: number) {
    return this.tagsService.softDelete(id);
  }
}
