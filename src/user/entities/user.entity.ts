import { v4 as uuidv4 } from 'uuid';

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
    this._password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  getId(): string {
    return this.id;
  }

  updatePassword(oldPassword: string, newPassword: string) {
    if (this._password !== oldPassword) {
      throw new Error('Incorrect old password');
    }
    this._password = newPassword;
    this.version++;
    this.updatedAt = Date.now();
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
}
