import { Task } from "../models/Task";
export class TaskService {
    constructor() {
        this.tasks = [];
    }
    createTask(title, description) {
        const task = new Task(title, description);
        this.tasks.push(task);
        return task;
    }
    getAllTasks() {
        return this.tasks;
    }
    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
    updateTask(id, title, description) {
        const task = this.getTaskById(id);
        if (!task)
            return false;
        task.title = title;
        task.description = description;
        return true;
    }
    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1)
            return false;
        this.tasks.splice(index, 1);
        return true;
    }
    assignTask(taskId, userId) {
        const task = this.getTaskById(taskId);
        if (!task)
            return false;
        task.assignedTo = userId;
        return true;
    }
    unassignTask(taskId) {
        const task = this.getTaskById(taskId);
        if (!task)
            return false;
        task.assignedTo = null;
        return true;
    }
    getTasksByUser(userId) {
        return this.tasks.filter(task => task.assignedTo === userId);
    }
}
