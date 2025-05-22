import { Task } from "../models/Task";

export class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  updateTask(id: string, title: string, description: string): boolean {
    const task = this.getTaskById(id);
    if (!task) return false;

    task.title = title;
    task.description = description;
    return true;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  assignTask(taskId: string, userId: string): boolean {
    const task = this.getTaskById(taskId);
    if (!task) return false;

    task.assignedTo = userId;
    return true;
  }

  unassignTask(taskId: string): boolean {
    const task = this.getTaskById(taskId);
    if (!task) return false;

    task.assignedTo = null;
    return true;
  }

  getTasksByUser(userId: string): Task[] {
    return this.tasks.filter(task => task.assignedTo === userId);
  }
}

