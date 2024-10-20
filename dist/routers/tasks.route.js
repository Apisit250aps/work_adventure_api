"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const task = (0, express_1.Router)();
task.use(auth_middleware_1.authenticateJWT);
task.post("/create/:workId", tasks_controller_1.default.createTask); // Create a new task
task.put("/update/:taskId", tasks_controller_1.default.updateTask); // Update an existing task by ID
task.delete("/delete/:taskId", tasks_controller_1.default.deleteTask); // Delete a task by ID
task.get("/get/:taskId", tasks_controller_1.default.getTask); // Get a task by ID
task.get("/:workId", tasks_controller_1.default.getAllTasks); // Get all tasks
exports.default = task;
//# sourceMappingURL=tasks.route.js.map