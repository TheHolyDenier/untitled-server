import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '@prisma/client';

@Controller('api/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.service.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req: { user: Partial<User> }) {
    return req.user;
  }

  @Patch(':id')
  async updateMe(@Param('id') id: string, @Body() body: Record<string, any>) {
    return this.service.updatePassword(id, body.password);
  }
}
