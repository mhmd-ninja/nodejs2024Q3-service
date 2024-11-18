import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User, UserDto } from './entities/user.entity';

@Injectable()
export class UserService {
  private users = new Map<string, User>();

  createUser(login: string, password: string): User {
    const newUser = new User(login, password);
    this.users.set(newUser.getId(), newUser);
    return newUser;
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
  ): User {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.updatePassword(oldPassword, newPassword);
    return user;
  }

  deleteUser(userId: string): void {
    if (!this.users.delete(userId)) {
      throw new Error('User not found');
    }
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}
