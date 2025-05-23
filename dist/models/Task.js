"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor(title, description) {
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.description = description;
        this.assignedTo = null; // initially unassigned
    }
}
exports.Task = Task;
