import { Request } from 'express';

export type ExtendedRequest = Request & {
  user?: {
    sub: string;
    email: string;
    username: string;
  };
};
