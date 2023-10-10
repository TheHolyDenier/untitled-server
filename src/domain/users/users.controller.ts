import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getMe(@Request() req: { user: Partial<User> }) {
    return req.user;
  }
}
