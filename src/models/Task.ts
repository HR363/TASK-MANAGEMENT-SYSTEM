import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string | null; // userId of the assigned user

  constructor(title: string, description: string) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.assignedTo = null; // initially unassigned
  }
}
