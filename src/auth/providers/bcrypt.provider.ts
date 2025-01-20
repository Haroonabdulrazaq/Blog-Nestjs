import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    // Hash Password
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
  }
  async comparePassword(
    data: string | Buffer,
    hashedPassword: any,
  ): Promise<boolean> {
    const result = await bcrypt.compare(data, hashedPassword);
    return result;
  }
}
