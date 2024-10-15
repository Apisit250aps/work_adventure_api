/** @format */

import { Request, Response } from "express"
import { ICharacter, Character } from "../models/character.model"
import { Special } from "../models/special.model"
import { IUser } from "../models/user.model"
import { CharacterStatistics } from "../models/characterStatistic.model"
import character from "../routers/character.route"
import mongoose from "mongoose";

export default {
  async createCharacter(
    req: Request<{ user?: IUser; body: ICharacter }>,
    res: Response
  ) {
    try {
      const userId = req.user?._id
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      const newCharacter = await Character.create({
        ...req.body,
        userId: userId
      })

      await CharacterStatistics.create({
        characterId: newCharacter._id
      })
      // Create a new Special associated with this character
      const newSpecial = await Special.create({
        charId: newCharacter._id // Assuming you have a characterId field in Special schema
        // Add any additional default properties or values if required by Special
      })

      return res.status(201).json({
        character: newCharacter,
        special: newSpecial
      })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },

  async getCharacter(req: Request<{ charId: string }>, res: Response) {
    try {
      const { charId } = req.params
      const characters = await Character.aggregate([
        { 
          $match: { _id: new  mongoose.Types.ObjectId(charId) } // หา Character ด้วย charId
        },
        {
          $lookup: {
            from: 'specials', // คอลเล็กชัน specials
            localField: '_id', // คอลัมน์ _id จาก Character
            foreignField: 'charId', // คอลัมน์ charId จาก Special
            as: 'special' // ผลลัพธ์จะถูกใส่ในฟิลด์นี้
          }
        },
        {
          $unwind: {
            path: '$special', // แปลง Array เป็น Object เพื่อใช้งาน
            preserveNullAndEmptyArrays: true // ถ้าไม่มีข้อมูล Special ก็ให้คง Character ไว้
          }
        }
      ]);
      return res.json({ characters })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },

  async updateCharacter(
    req: Request<{
      user?: IUser
      body: ICharacter
      charId: string
    }>,
    res: Response
  ) {
    try {
      const { charId } = req.params
      const updatedCharacter = await Character.findByIdAndUpdate(
        charId,
        { ...req.body },
        { new: true }
      )

      return res.json(updatedCharacter)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },

  async deleteCharacter(
    req: Request<{ user?: IUser; charId: string }>,
    res: Response
  ) {
    try {
      const { charId } = req.params
      const deletedCharacter = await Character.findByIdAndDelete(charId)
      return res.json({
        message: "Character deleted successfully",
        deletedCharacter
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: error || "An unexpected error occurred" })
    }
  },

  async myCharacter(req: Request, res: Response) {
    try {
      const userId = req.user?._id
      const characters = await Character.find({ userId: req.user?.id })
      res.status(200).json(characters)
    } catch (error) {
      return res
        .status(500)
        .json({ error: error || "An unexpected error occurred" })
    }
  }
}
