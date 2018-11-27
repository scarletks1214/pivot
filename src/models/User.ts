export interface IUserJSON {
  first_name: string;
  last_name: string;
  email: string;
}

class User {
  public static fromJson(json: IUserJSON): User {
    return new User(json.first_name, json.last_name, json.email);
  }

  constructor(public readonly firstName: string, public readonly lastName: string, public readonly email: string) {}

  public toJson(): IUserJSON {
    return {
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
    };
  }
}

export default User;
