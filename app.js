const fs = require("fs");
const filePath = "./tasks.json";

// Load tasks from file
const loadTasks = () => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]"); // create empty tasks.json
        }
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

// Save tasks to file
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(filePath, dataJSON);
};

// Add new task
const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({ task });
    saveTasks(tasks);
    console.log("Task added:", task);
};

// List tasks
const listTasks = () => {
    const tasks = loadTasks();
    console.log("Your tasks:");
    tasks.forEach((t, i) => {
        console.log(`${i + 1}. ${t.task}`);
    });
};

// Command handling
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    if (!argument) {
        console.log("Please provide a task name.");
    } else {
        addTask(argument);
    }
} else if (command === "list") {
    listTasks();
} else {
    console.log("Command not found. Use 'add' or 'list'.");
}
