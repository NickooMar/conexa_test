import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from 'src/config';
import { JwtService } from '@nestjs/jwt';
import { ExtendedRequest } from './types/request.types';
import { UserRole } from 'src/modules/auth/schemas/user.schema';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';
import { Reflector } from '@nestjs/core';

const { jsonWebTokenConfig } = config;

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  email: string;
  role: UserRole;
  username: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) {
        return true;
      }

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
