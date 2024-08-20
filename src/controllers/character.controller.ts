/** @format */

import { Request, Response } from "express";
import { ICharacter, Character } from "../models/character.model";

export default {
  async createCharacter(req: Request, res: Response) {
    try {
      const { name, userId } = req.body;
      const newCharacter = await Character.create({
        name,
        userId: [userId],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(newCharacter);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async getCharacter(req: Request, res: Response) {
    try {
      const characters = await Character.find({ userId: req.user?._id });
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async updateCharacter(req: Request, res: Response) {
    try {
      const { charId, name, exp, level, coin, health, stamina, focus_point } =
        req.body;
      const updatedCharacter = await Character.findByIdAndUpdate(
        charId,
        {
          name,
          exp,
          level,
          coin,
          health,
          stamina,
          focus_point,
          updatedAt: new Date(),
        },
        { new: true }
      );
      res.json(updatedCharacter);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async deleteCharacter(
    req: Request<{ charId: string }>, // Type the request params correctly
    res: Response
  ) {
    try {
      const { charId } = req.params;
      const deletedCharacter = await Character.findByIdAndDelete(charId);
      if (!deletedCharacter) {
        return res.status(404).json({ error: "Character not found" });
      }
      res.json({ message: "Character deleted successfully", deletedCharacter });
    } catch (error) {
      res.status(500).json({ error: error || "An unexpected error occurred" });
    }
  },
};
