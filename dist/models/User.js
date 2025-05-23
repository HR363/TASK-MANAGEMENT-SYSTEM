"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/User.ts
const uuid_1 = require("uuid");
class User {
    constructor(name, email) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.email = email;
    }
}
exports.User = User;
