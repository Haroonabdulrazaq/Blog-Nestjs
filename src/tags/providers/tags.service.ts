import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  public async create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    const response = await this.tagRepository.save(newTag);
    return response;
  }

  public async findMultipleTagById(tags: number[]) {
    const result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
    return result;
  }
}
