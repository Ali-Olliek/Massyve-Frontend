import { Base } from './Base';

export class User extends Base {
  public email: string;
  public username: string;
  public refreshToken: string;
  public accessToken: string;
  constructor(user: any) {
    super(user);
    this.email = user.email;
    this.username = user.username;
    this.refreshToken = user.refreshToken;
    this.accessToken = user.accessToken;
  }
}
