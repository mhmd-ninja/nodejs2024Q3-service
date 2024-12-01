import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  login(input: LoginDto): { user: UserDto; accessToken: string } {
    const user = this.userService.getByLogin(input.login);

    if (!user)
      throw new HttpException('Login does not exist', HttpStatus.BAD_REQUEST);

    if (!user.isPasswordsTheSame(input.password))
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

    const accessToken = this.jwtService.sign({
      id: user.getUserData().id,
      login: user.getUserData().login,
    });

    return {
      user: user.getUserData(),
      accessToken,
    };
  }
}
