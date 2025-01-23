import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract request from Execution Context
    const request = context.switchToHttp().getRequest();
    // Extract token from the header
    const token = this.extractRequestFromHeader(request);
    // Validate token
    if (!token) {
      throw new UnauthorizedException('Unauthorized request');
    }

    // Accept or deny the request base on token validity
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization?.split(' ')[1] ?? undefined;

    return token;
  }
}
