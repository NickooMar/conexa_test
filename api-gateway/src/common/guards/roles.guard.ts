import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ExtendedRequest } from './types/request.types';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';
import { UserRole } from '../../modules/auth/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const user = request.user;

    if (!user) throw new UnauthorizedException('User not authenticated');

    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Match roles between required and user roles
    const hasRole = requiredRoles.some((role: UserRole) =>
      user.role.includes(role),
    );

    if (!hasRole) throw new UnauthorizedException('Insufficient permissions');

    return true;
  }
}
