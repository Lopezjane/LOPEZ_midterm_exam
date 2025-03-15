let tasks = [];
let taskId = 1;

// Select UI elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Task Constructor
class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

// Function to render tasks in the UI
const renderTasks = () => {
    todoList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "flex flex-col bg-gray-200 p-3 rounded-lg shadow-md";
        li.innerHTML = `
            <div>
                <span class="font-semibold">${task.name}</span>
                <p class="text-gray-600">${task.description}</p>
            </div>
            <div class="flex gap-2 mt-2">
                <button class="text-blue-500 hover:underline edit-btn" data-id="${task.id}">Edit</button>
                <button class="text-red-500 hover:underline delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
};

// Add Task Function
const addTask = (name, description) => {
    if (!name.trim() || !description.trim()) return alert("Task name and description cannot be empty!");
    const newTask = new Task(taskId++, name, description);
    tasks.push(newTask);
    console.log("Task added");
    renderTasks();
};

// View Tasks Function
const viewTasks = () => {
    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }
    console.log("Tasks List:");
    tasks.forEach(task => {
        console.log(`ID: ${task.id}, Name: ${task.name}, Description: ${task.description}`);
    });
};

// Update Task Function
const updateTask = (id, newName, newDescription) => {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.log("Task not found.");
        return;
    }
    task.name = newName;
    task.description = newDescription;
    console.log(`Task ID: ${task.id}, successfully updated`);
    renderTasks();
};

// Delete Task Function
const deleteTask = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        console.log("Task not found.");
        return;
    }
    tasks.splice(index, 1);
    console.log(`Task ID: ${id}, deleted successfully`);
    renderTasks();
};

// Form Submit Event Listener
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = todoInput.value.trim();
    const taskDescription = prompt("Enter task description:");
    if (taskDescription !== null) {
        addTask(taskName, taskDescription);
        todoInput.value = "";
    }
});

// Click Event for Edit & Delete
todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        deleteTask(id);
    } else if (e.target.classList.contains("edit-btn")) {
        const id = parseInt(e.target.dataset.id);
        const newName = prompt("Edit Task Name:");
        const newDescription = prompt("Edit Task Description:");
        if (newName && newDescription) updateTask(id, newName, newDescription);
    }
});

// Initial Render
renderTasks();

// Console Tests
console.log(viewTasks());

console.log(addTask("Task1", "This is a task"));
console.log(viewTasks());

console.log(updateTask(1, "Task2", "This is an updated task"));
console.log(viewTasks());

console.log(deleteTask(1));
console.log(viewTasks());
        