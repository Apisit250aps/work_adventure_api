import { Request, Response } from "express"
import { Task, ITask } from "../models/tasks.model"

export default {
  async createTask(
    req: Request<{ body: ITask; workId: String }>,
    res: Response
  ) {
    try {
      const { workId } = req.params
      const newTask = await Task.create({
        ...req.body,
        workId
      })

      res.status(201).json({
        message: "Task created successfully!",
        task: newTask
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async updateTask(
    req: Request<{ taskId: string; body: ITask; workId: String }>,
    res: Response
  ) {
    try {
      const { taskId, workId } = req.params

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { ...req.body },
        { new: true }
      )

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(200).json({
        message: "Task updated successfully!",
        task: updatedTask
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async deleteTask(
    req: Request<{ taskId: string;  }>,
    res: Response
  ) {
    try {
      const { taskId } = req.params

      const deletedTask = await Task.findByIdAndDelete(taskId)

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(200).json({
        message: "Task deleted successfully!",
        task: deletedTask
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async getTask(req: Request<{ taskId: string }>, res: Response) {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)

      if (!task) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(200).json({ task })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find()

      res.status(200).json({ tasks })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
