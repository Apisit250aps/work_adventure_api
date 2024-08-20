import { Request, Response } from "express"
import { IWork, Work } from "../models/work.model"

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
      const work = await Work.findById(workId)

      if (!work) {
        return res.status(404).json({ error: "Work not found" })
      }

      res.status(200).json({ work })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  async getAllWorks(req: Request<{ characterId: String }>, res: Response) {
    try {
      const { characterId } = req.params
      const works = await Work.find({ characterId })

      res.status(200).json({ works })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
