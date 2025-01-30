import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-files.interface';
import { fileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported type
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      console.log('Mime type is not correct');

      throw new BadRequestException('Mime type not supported');
    }

    try {
      // Upload to AWS S3 bucket
      const fileName = await this.uploadToAwsProvider.fileUpload(file);
      // Geneerate a new Entry in the DB
      const newfile: UploadFile = {
        name: fileName,
        path: `https://${this.configService.get('appConfig.awsCloudFront')}/${fileName}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      const createdFile = this.uploadRepository.create(newfile);
      return await this.uploadRepository.save(createdFile);
    } catch (error) {
      console.log('Im Upload Provider');

      throw new ConflictException(error);
    }
  }
}
