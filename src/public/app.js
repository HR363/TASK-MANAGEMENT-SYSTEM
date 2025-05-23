// public/app.js

// Import compiled services from the 'dist' folder
import { UserService } from '../dist/services/UserService.js';
import { TaskService } from '../dist/services/TaskService.js';

// Initialize services
const userService = new UserService();
const taskService = new TaskService();

// --- DOM Elements ---
const createUserForm = document.getElementById('createUserForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userListUl = document.getElementById('userList');

const createTaskForm = document.getElementById('createTaskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskListUl = document.getElementById('taskList');

const assignTaskForm = document.getElementById('assignTaskForm');
const assignTaskIdSelect = document.getElementById('assignTaskId');
const assignUserIdSelect = document.getElementById('assignUserId');

const unassignTaskForm = document.getElementById('unassignTaskForm');
const unassignTaskIdSelect = document.getElementById('unassignTaskId');

const viewTasksByUserForm = document.getElementById('viewTasksByUserForm');
const viewTasksUserIdSelect = document.getElementById('viewTasksUserId');
const tasksByUserListUl = document.getElementById('tasksByUserList');

// --- Functions to Render Lists ---

function renderUsers() {
    userListUl.innerHTML = ''; // Clear existing list
    const users = userService.getAllUsers(); // Get all users
    assignUserIdSelect.innerHTML = '<option value="">Select User</option>';
    viewTasksUserIdSelect.innerHTML = '<option value="">Select User</option>';

    if (users.length === 0) {
        userListUl.innerHTML = '<li>No users created yet.</li>';
        return;
    }

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${user.name}</strong> (${user.email})<br>
                <small>ID: ${user.id}</small>
            </div>
            <div class="actions">
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            </div>
        `;
        userListUl.appendChild(li);

        // Populate user selects for assignment and viewing tasks
        const assignOption = document.createElement('option');
        assignOption.value = user.id;
        assignOption.textContent = user.name;
        assignUserIdSelect.appendChild(assignOption);

        const viewOption = document.createElement('option');
        viewOption.value = user.id;
        viewOption.textContent = user.name;
        viewTasksUserIdSelect.appendChild(viewOption);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.user-management .delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const userId = event.target.dataset.id;
            if (confirm(`Are you sure you want to delete user ${userId}? This will unassign any tasks assigned to them.`)) {
                // Before deleting user, unassign their tasks
                taskService.getTasksByUser(userId).forEach(task => { // Get tasks assigned to specific user
                    taskService.unassignTask(task.id); // Unassign tasks
                });

                userService.deleteUser(userId); // Delete user
                renderUsers();
                renderTasks(); // Re-render tasks to reflect unassignments
            }
        });
    });
}

function renderTasks() {
    taskListUl.innerHTML = ''; // Clear existing list
    const tasks = taskService.getAllTasks(); // Get all tasks
    assignTaskIdSelect.innerHTML = '<option value="">Select Task</option>';
    unassignTaskIdSelect.innerHTML = '<option value="">Select Task to Unassign</option>';

    if (tasks.length === 0) {
        taskListUl.innerHTML = '<li>No tasks created yet.</li>';
        return;
    }

    tasks.forEach(task => {
        const assignedUserName = task.assignedTo ? (userService.getUserById(task.assignedTo)?.name || 'Unknown User') : 'Unassigned'; // Get user by ID
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <span>${task.description}</span><br>
                <small>ID: ${task.id}</small><br>
                <small>Assigned To: ${assignedUserName}</small>
            </div>
            <div class="actions">
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        taskListUl.appendChild(li);

        // Populate task selects for assignment and unassignment
        const assignOption = document.createElement('option');
        assignOption.value = task.id;
        assignOption.textContent = `${task.title} (Assigned: ${assignedUserName})`;
        assignTaskIdSelect.appendChild(assignOption);

        const unassignOption = document.createElement('option');
        unassignOption.value = task.id;
        unassignOption.textContent = `${task.title} (Assigned: ${assignedUserName})`;
        unassignTaskIdSelect.appendChild(unassignOption);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.task-management .delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const taskId = event.target.dataset.id;
            if (confirm(`Are you sure you want to delete task ${taskId}?`)) {
                taskService.deleteTask(taskId); // Delete task
                renderTasks();
            }
        });
    });
}

function renderTasksByUser(userId) {
    tasksByUserListUl.innerHTML = ''; // Clear existing list
    if (!userId) {
        tasksByUserListUl.innerHTML = '<li>Please select a user.</li>';
        return;
    }

    const tasks = taskService.getTasksByUser(userId); // Get tasks assigned to specific user
    if (tasks.length === 0) {
        const user = userService.getUserById(userId); // Get user by ID
        tasksByUserListUl.innerHTML = `<li>No tasks assigned to ${user ? user.name : 'this user'}.</li>`;
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <span>${task.description}</span>
            </div>
        `;
        tasksByUserListUl.appendChild(li);
    });
}


// --- Event Listeners ---

// Create User
createUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = userNameInput.value;
    const email = userEmailInput.value;
    userService.createUser(name, email); // Create user
    userNameInput.value = '';
    userEmailInput.value = '';
    renderUsers();
});

// Create Task
createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    taskService.createTask(title, description); // Create task
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    renderTasks();
});

// Assign Task
assignTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskId = assignTaskIdSelect.value;
    const userId = assignUserIdSelect.value;
    if (taskId && userId) {
        taskService.assignTask(taskId, userId); // Assign tasks to users
        renderTasks();
        alert('Task assigned successfully!');
    } else {
        alert('Please select both a task and a user.');
    }
});

// Unassign Task
unassignTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskId = unassignTaskIdSelect.value;
    if (taskId) {
        taskService.unassignTask(taskId); // Unassign tasks
        renderTasks();
        alert('Task unassigned successfully!');
    } else {
        alert('Please select a task to unassign.');
    }
});

// View Tasks by User
viewTasksByUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = viewTasksUserIdSelect.value;
    renderTasksByUser(userId);
});


// Initial render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderUsers();
    renderTasks();
});