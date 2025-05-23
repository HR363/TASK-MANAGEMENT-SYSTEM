"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
class UserService {
    constructor() {
        this.users = [];
    }
    createUser(name, email) {
        const user = new User_1.User(name, email);
        this.users.push(user);
        return user;
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(userId) {
        return this.users.find((user) => user.id === userId);
    }
    updateUser(userId, name, email) {
        const user = this.getUserById(userId);
        if (user) {
            user.name = name;
            user.email = email;
        }
        return user;
    }
    deleteUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter((user) => user.id !== userId);
        return this.users.length < initialLength;
    }
}
exports.UserService = UserService;
