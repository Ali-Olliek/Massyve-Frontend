import { User } from '../classes/User';

export default class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  }

  saveUser(user: User | Partial<User>) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    const userData = localStorage.getItem('user');

    if (!userData) return null;

    const user = new User(JSON.parse(userData));

    return user;
  }
}
