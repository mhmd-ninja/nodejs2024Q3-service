import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User, UserDto } from './entities/user.entity';
import { log } from 'console';

@Injectable()
export class UserService {
  private users = new Map<string, User>();

  createUser(login: string, password: string): UserDto {
    const existLogin = this.getByLogin(login);

    if (existLogin)
      throw new HttpException('Login already exist', HttpStatus.BAD_REQUEST);

    const newUser = new User(login, password);
    this.users.set(newUser.getId(), newUser);
    return newUser.getUserData();
  }

  getUserById(id: string): UserDto {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.getUserData();
  }

  updateUserPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): UserDto {
    const user = this.users.get(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    user.updatePassword(oldPassword, newPassword);
    return user.getUserData();
  }

  deleteUser(userId: string): void {
    if (!this.users.delete(userId)) {
      throw new Error('User not found');
    }
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getByLogin(login: string): User | null {
    for (const [key, user] of this.users) {
      if (user.getLogin() == login) {
        return user;
      }
    }

    return null;
  }
}
