"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline-sync");
const UserService_1 = require("./services/UserService");
const TaskService_1 = require("./services/TaskService");
const userService = new UserService_1.UserService();
const taskService = new TaskService_1.TaskService();
function mainMenu() {
    while (true) {
        console.log("\n=== USER & TASK MANAGEMENT SYSTEM ===");
        console.log("1. Create User");
        console.log("2. List Users");
        console.log("3. Create Task");
        console.log("4. List Tasks");
        console.log("5. Assign Task to User");
        console.log("6. Unassign Task");
        console.log("7. View Tasks Assigned to User");
        console.log("8. Exit");
        const choice = readline.question("Enter your choice: ");
        switch (choice) {
            case "1":
                const name = readline.question("Enter user name: ");
                const email = readline.question("Enter user email: ");
                const user = userService.createUser(name, email);
                console.log("User created:", user);
                break;
            case "2":
                const users = userService.getAllUsers();
                console.log("All Users:");
                users.forEach(u => console.log(u));
                break;
            case "3":
                const title = readline.question("Enter task title: ");
                const description = readline.question("Enter task description: ");
                const task = taskService.createTask(title, description);
                console.log("Task created:", task);
                break;
            case "4":
                const tasks = taskService.getAllTasks();
                console.log("All Tasks:");
                tasks.forEach(t => console.log(t));
                break;
            case "5":
                const taskId = readline.question("Enter task ID to assign: ");
                const userId = readline.question("Enter user ID to assign to: ");
                if (taskService.assignTask(taskId, userId)) {
                    console.log("Task assigned.");
                }
                else {
                    console.log("Invalid task or user ID.");
                }
                break;
            case "6":
                const unassignId = readline.question("Enter task ID to unassign: ");
                if (taskService.unassignTask(unassignId)) {
                    console.log("Task unassigned.");
                }
                else {
                    console.log("Invalid task ID.");
                }
                break;
            case "7":
                const uid = readline.question("Enter user ID: ");
                const userTasks = taskService.getTasksByUser(uid);
                console.log(`Tasks assigned to user ${uid}:`);
                userTasks.forEach(t => console.log(t));
                break;
            case "8":
                console.log("Exiting... Goodbye!");
                process.exit();
            default:
                console.log("Invalid choice. Try again.");
        }
    }
}
mainMenu();
