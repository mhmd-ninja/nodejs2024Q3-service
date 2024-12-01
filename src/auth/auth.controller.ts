import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() input: LoginDto): {
    user: UserDto;
    accessToken: string;
  } {
    return this.authService.login(input);
  }
}
