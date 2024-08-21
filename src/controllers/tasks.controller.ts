import { Request, Response } from "express";
import { Task, ITask } from "../models/tasks.model";

export default {
  async createTask(req: Request<{ body: ITask }>, res: Response) {
    try {
      const { name, description, difficulty, start_date, due_date, status, workId } = req.body;

      const newTask = await Task.create({
        name,
        description,
        difficulty,
        start_date,
        due_date,
        status,
        workId,
      });

      res.status(201).json({
        message: "Task created successfully!",
        task: newTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateTask(req: Request<{ taskId: string; body: ITask }>, res: Response) {
    try {
      const { taskId } = req.params;
      const { name, description, difficulty, start_date, due_date, status, workId } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { name, description, difficulty, start_date, due_date, status, workId },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({
        message: "Task updated successfully!",
        task: updatedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteTask(req: Request<{ taskId: string }>, res: Response) {
    try {
      const { taskId } = req.params;

      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({
        message: "Task deleted successfully!",
        task: deletedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getTask(req: Request<{ taskId: string }>, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find();

      res.status(200).json({ tasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

