import User from '../models/User';
import Nullable from '../utils/Nullable';

export interface ICurrentUserStorage {
  save: (user: User) => void;
  load: () => Nullable<User>;
  clear: () => void;
}

export class CurrentUserSessionStorage implements ICurrentUserStorage {
  private static KEY: string = 'TRANE_CURRENT_USER';

  public save(user: User): void {
    sessionStorage.setItem(CurrentUserSessionStorage.KEY, JSON.stringify(user.toJson()));
  }

  public load(): Nullable<User> {
    if (!window.sessionStorage) {
      return null;
    }

    const result: string | null = window.sessionStorage.getItem(CurrentUserSessionStorage.KEY);

    if (!result) {
      return null;
    }

    return User.fromJson(JSON.parse(result));
  }

  public clear(): void {
    sessionStorage.removeItem(CurrentUserSessionStorage.KEY);
  }
}
