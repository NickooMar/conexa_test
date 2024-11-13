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

    if (!requiredRoles) {
      // No roles are required, allow access
      return true;
    }

    // const userRole = await this.userModel
    //   .findById(user.sub)
    //   .select('role')
    //   .exec();

    // console.log({ userRole });

    // // Match roles between required and user roles
    // const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    // if (!hasRole) {
    //   throw new UnauthorizedException('Insufficient permissions');
    // }

    return true;
  }
}
