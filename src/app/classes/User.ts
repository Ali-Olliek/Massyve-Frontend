import { Base, IBase } from './Base';

interface IUserData {
  base: IBase;
  email: string;
  username: string;
  refreshToken: string;
  accessToken: string;
}
export class User extends Base {
  public email: string;
  public username: string;
  public refreshToken: string;
  public accessToken: string;
  constructor(user: IUserData) {
    super(user.base);
    this.email = user.email;
    this.username = user.username;
    this.refreshToken = user.refreshToken;
    this.accessToken = user.accessToken;
  }
}
