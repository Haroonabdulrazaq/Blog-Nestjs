import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from '../entities/meta-option.entity';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}
  public async create(createPostMetaOptionDto: CreatePostMetaOptionsDto) {
    const newMetaOptions = this.metaOptionRepository.create(
      createPostMetaOptionDto,
    );
    const response = await this.metaOptionRepository.save(newMetaOptions);
    return response;
  }
}
