import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProvider],
})
export class UploadsModule {}
