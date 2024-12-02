import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() input: CreateUserDto) {
    return this.authService.signUp(input);
  }

  @Post('login')
  signIn(@Body() input: LoginDto): {
    user: UserDto;
    accessToken: string;
  } {
    return this.authService.login(input);
  }
}
