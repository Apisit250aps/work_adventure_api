import mongoose from "mongoose";
import { ISpecial, Special } from "../models/special.model";
import { Request, Response } from "express";
const specialPipeline = (match: Record<string, unknown> = {}) => [
  {
    $match: match
  },
  {
    $project: {
      _id: 1,
      charId: 1,
      strength: 1,
      perception: 1,
      endurance: 1,
      charisma: 1,
      intelligence: 1,
      agility: 1,
      luck: 1,
      createdAt: 1,
      updatedAt: 1
    }
  }
];

export default {
  async createSpecial(
    req: Request<{ body: ISpecial; charId: string }>,
    res: Response
  ) {
    try {
      const { strength, perception, endurance, charisma, intelligence, agility, luck } = req.body;
      const { charId } = req.params;

      const newSpecial = await Special.create({
        charId: new mongoose.Types.ObjectId(charId),
        strength,
        perception,
        endurance,
        charisma,
        intelligence,
        agility,
        luck
      });

      res.status(201).json({
        message: "Special stats created successfully!",
        special: newSpecial
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateSpecial(
    req: Request<{ specialId: string; body: Partial<ISpecial> }>,
    res: Response
  ) {
    try {
      const { specialId } = req.params;
      const updateData = req.body;

      console.log(updateData);

      const updatedSpecial = await Special.findByIdAndUpdate(
        specialId,
        updateData,
        { new: true }
      );

      if (!updatedSpecial) {
        return res.status(404).json({ error: "Special stats not found" });
      }

      res.status(200).json({
        message: "Special stats updated successfully!",
        special: updatedSpecial
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteSpecial(req: Request<{ specialId: string }>, res: Response) {
    try {
      const { specialId } = req.params;

      const deletedSpecial = await Special.findByIdAndDelete(specialId);

      if (!deletedSpecial) {
        return res.status(404).json({ error: "Special stats not found" });
      }

      res.status(200).json({
        message: "Special stats deleted successfully!",
        special: deletedSpecial
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getSpecial(req: Request<{ specialId: string }>, res: Response) {
    try {
      const { specialId } = req.params;
      const pipeline = specialPipeline({
        _id: new mongoose.Types.ObjectId(specialId)
      });
      const result = await Special.aggregate(pipeline).exec();

      if (!result || result.length === 0) {
        return res.status(404).json({ error: "Special stats not found" });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllSpecials(req: Request<{ charId: string }>, res: Response) {
    try {
      const { charId } = req.params;

      const pipeline = specialPipeline({
        charId: new mongoose.Types.ObjectId(charId)
      });
      const result = await Special.aggregate(pipeline).exec();

      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};