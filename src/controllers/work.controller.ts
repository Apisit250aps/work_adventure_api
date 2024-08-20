import { Request, Response } from "express"
import { IUser, User } from "../models/user.model"
import { IWork, Work } from "../models/work.model"

export default {
  async createWork(req: Request<{ user?: IUser; body: IWork }>, res: Response) {
    try {
      const { name, description, start_date, due_date, status } = req.body
      const userId = req.user?._id

      const newWork = await Work.create({
        userId,
        name,
        description,
        start_date,
        due_date,
        status
      })

      await User.findByIdAndUpdate(userId, {
        $push: { works: newWork._id }
      })

      res.status(201).json({
        message: "สร้างงานใหม่สำเร็จ!",
        work: newWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
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
        return res.status(404).json({ error: "ไม่พบงานที่ต้องการอัปเดต" })
      }

      res.status(200).json({
        message: "อัปเดตงานสำเร็จ!",
        work: updatedWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
    }
  },

  async deleteWork(req: Request<{ workId: string }>, res: Response) {
    try {
      const { workId } = req.params
      const userId = req.user?.userId

      const deletedWork = await Work.findByIdAndDelete(workId)

      if (!deletedWork) {
        return res.status(404).json({ error: "ไม่พบงานที่ต้องการลบ" })
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { works: workId }
      })

      res.status(200).json({
        message: "ลบงานสำเร็จ!",
        work: deletedWork
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
    }
  },

  async getWork(req: Request<{ workId: string }>, res: Response) {
    try {
      const { workId } = req.params
      const work = await Work.findById(workId)

      if (!work) {
        return res.status(404).json({ error: "ไม่พบงานที่ต้องการดู" })
      }

      res.status(200).json({ work })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
    }
  },

  async getAllWorks(req: Request<{ user?: IUser }>, res: Response) {
    try {
      const userId = req.user?.userId
      const works = await Work.find({ userId })

      res.status(200).json({ works })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
    }
  }
}
