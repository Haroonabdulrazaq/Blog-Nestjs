import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}
  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();
    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('appConfig.awsBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      console.log('++++++++++++++++++++++');
      console.log(uploadResult);

      return uploadResult.Key; // This returns the name of the file in S3
    } catch (error) {
      console.log('Upload Here in AWS Provider');

      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    let name = file.originalname.split('.')[0];
    // Get the extension of the file
    const extension = path.extname(file.originalname);
    // extract the white space
    name = name.replace(/\s/g, '').trim();
    // Generate timestamp
    const timestamp = new Date().getTime().toString().trim();
    return `${name}-${timestamp}${uuid4()}${extension}`;
  }
}
// awsBucketName awsRegion awsCloudFront awsAcessKeyId awsSecretKey
