import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import tasksController from "../controllers/tasks.controller";

const task = Router();
task.use(authenticateJWT);

task.post("/create/:workId", tasksController.createTask); // Create a new task
task.put("/update/:taskId", tasksController.updateTask); // Update an existing task by ID
task.delete("/delete/:taskId", tasksController.deleteTask); // Delete a task by ID
task.get("/get/:taskId", tasksController.getTask); // Get a task by ID
task.get("/:workId", tasksController.getAllTasks); // Get all tasks

export default task;
