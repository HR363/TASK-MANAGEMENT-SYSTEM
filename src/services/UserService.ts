import { User } from "../models/User";

export class UserService {
  private users: User[] = [];

  createUser(name: string, email: string): User {
    const user = new User(name, email);
    this.users.push(user);
    return user;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  updateUser(userId: string, name: string, email: string): User | undefined {
    const user = this.getUserById(userId);
    if (user) {
      user.name = name;
      user.email = email;
    }
    return user;
  }

  deleteUser(userId: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== userId);
    return this.users.length < initialLength;
  }
}
