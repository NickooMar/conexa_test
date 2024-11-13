import { Request } from 'express';
import { UserRole } from '../../../modules/auth/schemas/user.schema';

export type ExtendedRequest = Request & {
  user?: {
    sub: string;
    email: string;
    role: UserRole;
    username: string;
  };
};
