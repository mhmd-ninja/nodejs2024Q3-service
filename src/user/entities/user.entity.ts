import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

export interface UserDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class User {
  private readonly id: string;
  private readonly login: string;
  private _password: string;
  private version: number;
  private readonly createdAt: number;
  private updatedAt: number;

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this._password = this.generateHashedPassword(password);
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  getId(): string {
    return this.id;
  }

  updatePassword(newPassword: string) {
    this._password = this.generateHashedPassword(newPassword);
    this.version++;
    this.updatedAt = Date.now();
  }

  isPasswordsTheSame(oldPassword: string): boolean {
    return bcrypt.compareSync(oldPassword, this._password);
  }

  generateHashedPassword(password: string): string {
    return bcrypt.hashSync(password, parseInt(process.env.CRYPT_SALT) || 11);
  }

  getUserData(): UserDto {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getLogin(): string {
    return this.login;
  }
}
