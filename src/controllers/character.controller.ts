/** @format */

import { Request, Response } from "express";
import { ICharacter, Character } from "../models/character.model";
import { Special } from "../models/special.model";
import { IUser } from "../models/user.model";
import { CharacterStatistics } from "../models/characterStatistic.model";

export default {
  async createCharacter(
    req: Request<{ user?: IUser; body: ICharacter }>,
    res: Response
  ) {
    try {
      const { name, className }: { name: string; className: string } = req.body;
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const newCharacter = await Character.create({
        name,
        userId: userId,
        className,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newCharacterStatistics = await CharacterStatistics.create({
        characterId: newCharacter._id,
      });
      // Create a new Special associated with this character
      const newSpecial = await Special.create({
        charId: newCharacter._id, // Assuming you have a characterId field in Special schema
        // Add any additional default properties or values if required by Special
      });

      return res.status(201).json({
        character: newCharacter,
        special: newSpecial,
         // Include the newly created special data in the response if needed
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async getCharacter(
    req: Request<{ user?: IUser; body: ICharacter }>,
    res: Response
  ) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const characters = await Character.find({ userId });
      return res.json(characters);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async updateCharacter(
    req: Request<{
      user?: IUser;
      body: Partial<ICharacter>;
      charId: string;
    }>,
    res: Response
  ) {
    try {
      const { charId } = req.params;
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { name, exp, level, coin, health, stamina, focus_point } = req.body;

      // Verify if the character belongs to the authenticated user
      const character = await Character.findById(charId);
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
      if (character.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: "Forbidden" });
      }

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
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { charId } = req.params;

      // Verify if the character belongs to the authenticated user
      const character = await Character.findById(charId);
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
      if (character.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: "Forbidden" });
      }

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
