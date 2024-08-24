/** @format */

import { Request, Response } from "express";
import { ICharacter, Character } from "../models/character.model";
import { Special } from "../models/special.model";
import { IUser } from "../models/user.model";
import { CharacterStatistics } from "../models/characterStatistic.model";
import { levelUp } from "../rules/character.rule"; // นำเข้า levelUp

export default {
  async createCharacter(
    req: Request<{ user?: IUser; body: ICharacter }>,
    res: Response
  ) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const newCharacter = await Character.create({
        ...req.body,
        userId: userId,
      });

      await CharacterStatistics.create({
        characterId: newCharacter._id,
      });

      // Create a new Special associated with this character
      const newSpecial = await Special.create({
        charId: newCharacter._id,
      });

      return res.status(201).json({
        character: newCharacter,
        special: newSpecial,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async getCharacter(req: Request<{ charId: IUser }>, res: Response) {
    try {
      const { charId } = req.params;
      const characters = await Character.find({ _id: charId });
      return res.json({ characters });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async updateCharacter(
  req: Request<{
    user?: IUser;
    body: ICharacter;
    charId: string;
  }>,
  res: Response
) {
  try {
    const { charId } = req.params;
    const { exp, ...restOfBody } = req.body;

    // ดึงข้อมูลตัวละครจากฐานข้อมูลเพื่อใช้ค่า EXP เดิม
    const character = await Character.findById(charId);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    // เพิ่ม EXP ใหม่เข้ากับ EXP เดิมที่มีอยู่
    const updatedExp = (character.exp || 0) + (exp || 0);

    // คำนวณเลเวลใหม่จาก EXP ที่เพิ่มแล้ว
    const level = await levelUp(updatedExp);

    // อัปเดตข้อมูลตัวละครรวมถึง EXP และเลเวลใหม่
    const updatedCharacter = await Character.findByIdAndUpdate(
      charId,
      { ...restOfBody, exp: updatedExp, level }, // เพิ่มค่า EXP และ level ที่คำนวณได้เข้าไปใน body
      { new: true }
    );

    return res.json(updatedCharacter);
  } catch (error) {
    return res.status(500).json({ error });
  }
},

  async deleteCharacter(
    req: Request<{ user?: IUser; charId: string }>,
    res: Response
  ) {
    try {
      const { charId } = req.params;
      const deletedCharacter = await Character.findByIdAndDelete(charId);
      return res.json({
        message: "Character deleted successfully",
        deletedCharacter,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error || "An unexpected error occurred" });
    }
  },
};
