import { Request, Response } from "express"
import { IWork, Work } from "../models/work.model"
import mongoose from "mongoose"
import { workAllPipeline } from "./pipelines/work.pipeline";

const workPipeline = (match: Record<string, unknown> = {}) => [
  {
    $match: match
  },
  {
    $lookup: {
      from: "tasks",
      localField: "_id",
      foreignField: "workId",
      as: "tasks"
    }
  },
  {
    $project: {
      _id: 1,
      characterId: 1,
      name: 1,
      description: 1,
      start_date: 1,
      due_date: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      tasks: {
        $map: {
          input: "$tasks",
          as: "task",
          in: {
            _id: "$$task._id",
            name: "$$task.name",
            description: "$$task.description",
            difficulty: "$$task.difficulty",
            start_date: "$$task.start_date",
            due_date: "$$task.due_date",
            isDone: "$$task.isDone",
            createdAt: "$$task.createdAt",
            updatedAt: "$$task.updatedAt"
          }
        }
      }
    }
  }
]

export default {
  async createWork(
    req: Request<{ body: IWork; characterId: String }>,
    res: Response
  ) {
    try {
      const { name, description, start_date, due_date, status } = req.body
      const { characterId } = req.params

      const newWork = await Work.create({
        characterId,
        name,
        description,
        start_date,
        due_date,
        status
      })

      res.status(201).json({
        message: "Work created successfully!",
        work: newWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async updateWork(
    req: Request<{ workId: string; body: IWork }>,
    res: Response
  ) {
    try {
      const { workId } = req.params
      const { name, description, start_date, due_date, status } = req.body

      const updatedWork = await Work.findByIdAndUpdate(
        workId,
        { name, description, start_date, due_date, status },
        { new: true }
      )

      if (!updatedWork) {
        return res.status(404).json({ error: "Work not found" })
      }

      res.status(200).json({
        message: "Work updated successfully!",
        work: updatedWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async deleteWork(req: Request<{ workId: string }>, res: Response) {
    try {
      const { workId } = req.params

      const deletedWork = await Work.findByIdAndDelete(workId)

      if (!deletedWork) {
        return res.status(404).json({ error: "Work not found" })
      }

      res.status(200).json({
        message: "Work deleted successfully!",
        work: deletedWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async getWork(req: Request<{ workId: string }>, res: Response) {
    try {
      const { workId } = req.params
      const pipeline = workPipeline({
        _id: new mongoose.Types.ObjectId(workId)
      })
      const result = await Work.aggregate(pipeline).exec()

      if (!result) {
        return res.status(404).json({ error: "Work not found" })
      }

      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async getAllWorks(req: Request<{ characterId: string }>, res: Response) {
    try {
      const { characterId } = req.params
  
      const pipeline = workPipeline({
        characterId: new mongoose.Types.ObjectId(characterId)
      })
      const result = await Work.aggregate(pipeline).exec()
  
      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
