import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers().map((user) => user.getUserData());
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    return this.userService.createUser(login, password);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { oldPassword, newPassword } = updatePasswordDto;
    return this.userService.updateUserPassword(id, oldPassword, newPassword);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }
}
