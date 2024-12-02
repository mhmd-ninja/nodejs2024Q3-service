import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  signUp(input: CreateUserDto): UserDto {
    const existUser = this.userService.getByLogin(input.login);

    if (existUser)
      throw new HttpException('Login already exist', HttpStatus.BAD_REQUEST);

    return this.userService.createUser(input.login, input.password);
  }

  login(input: LoginDto): { user: UserDto; accessToken: string } {
    const user = this.userService.getByLogin(input.login);

    if (!user)
      throw new HttpException('Login does not exist', HttpStatus.FORBIDDEN);

    if (!user.isPasswordsTheSame(input.password))
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);

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
