import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      email: email,
    });

    console.log('tmp', user);

    if (!(await this.comparePassword(pass, user?.passwordHash))) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...currentUser } = user;

    return {
      accessToken: await this.jwtService.signAsync(currentUser),
      ...user,
    };
  }

  async updatePassword(userId: string, password: string) {
    return this.usersService.update({
      where: { id: userId },
      data: { passwordHash: await this.hashPassword(password) },
    });
  }

  private saltRounds = 10;

  private async hashPassword(text: string) {
    return bcrypt.hash(text, this.saltRounds);
  }

  private async comparePassword(text: string, hash: string) {
    return bcrypt.compare(text, hash);
  }
}
