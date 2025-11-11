import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import { User } from '../users/user.entity';

interface ExpressRequest extends Request {
  user: User;
}

export class AdminGuard implements CanActivate {
  constructor(private roles: string[]) {}

  async canActivate(context: ExecutionContext) {
    const req: ExpressRequest = context.switchToHttp().getRequest();
    return this.roles.includes(req.user?.role);
  }
}
