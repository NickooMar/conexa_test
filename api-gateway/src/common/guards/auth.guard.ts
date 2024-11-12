import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from 'src/config';
import { JwtService } from '@nestjs/jwt';
import { ExtendedRequest } from './types/request.types';

const { jsonWebTokenConfig } = config;

interface DecodedToken {
  sub: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<ExtendedRequest>();
      const token = this.extractToken(request);
      const payload = this.verifyToken(token);

      // Interceptor will use this to retrieve the user in the request
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractToken(request: ExtendedRequest): string {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization format. Expected format: Bearer [token]',
      );
    }

    return token;
  }

  private verifyToken(token: string): DecodedToken {
    try {
      const payload: DecodedToken = this.jwtService.verify(token, {
        secret: jsonWebTokenConfig.secret,
      });

      if (!payload || !payload.email || !payload.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
