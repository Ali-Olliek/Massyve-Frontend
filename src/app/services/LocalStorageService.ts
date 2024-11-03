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

  saveUser(user: User | Partial<User>): void {
    if (typeof window !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  deleteUser(): void {
    if (typeof window !== undefined) {
      localStorage.removeItem('user');
    }
  }

  getUser(): User | null {
    if (typeof window !== undefined) {
      const userData = localStorage.getItem('user');

      if (!userData) return null;

      const user = new User(JSON.parse(userData));

      return user;
    }
    return null;
  }
}
