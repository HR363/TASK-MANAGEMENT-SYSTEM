import { v4 as uuidv4 } from "uuid";
export class Task {
    constructor(title, description) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.assignedTo = null; // initially unassigned
    }
}
