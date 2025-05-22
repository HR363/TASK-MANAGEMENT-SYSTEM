// src/models/User.ts
import { v4 as uuidv4 } from "uuid";
export class User {
    constructor(name, email) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
    }
}
