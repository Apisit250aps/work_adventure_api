import { Request, Response } from "express";
import { Quest, IQuest } from "../models/quest.model";

export default {
  async createQuest(
    req: Request<{ body: IQuest }>,
    res: Response
  ) {
    try {
      const { name, description, type, start_date, due_date, status } = req.body;

      const newQuest = await Quest.create({
        name,
        description,
        type,
        start_date,
        due_date,
        status,
      });

      res.status(201).json({
        message: "Quest created successfully!",
        quest: newQuest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateQuest(
    req: Request<{ questId: string; body: IQuest }>,
    res: Response
  ) {
    try {
      const { questId } = req.params;
      const { name, description, type, start_date, due_date, status } = req.body;

      const updatedQuest = await Quest.findByIdAndUpdate(
        questId,
        { name, description, type, start_date, due_date, status },
        { new: true }
      );

      if (!updatedQuest) {
        return res.status(404).json({ error: "Quest not found" });
      }

      res.status(200).json({
        message: "Quest updated successfully!",
        quest: updatedQuest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteQuest(req: Request<{ questId: string }>, res: Response) {
    try {
      const { questId } = req.params;

      const deletedQuest = await Quest.findByIdAndDelete(questId);

      if (!deletedQuest) {
        return res.status(404).json({ error: "Quest not found" });
      }

      res.status(200).json({
        message: "Quest deleted successfully!",
        quest: deletedQuest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getQuest(req: Request<{ questId: string }>, res: Response) {
    try {
      const { questId } = req.params;
      const quest = await Quest.findById(questId);

      if (!quest) {
        return res.status(404).json({ error: "Quest not found" });
      }

      res.status(200).json({ quest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllQuests(req: Request, res: Response) {
    try {
      const quests = await Quest.find();

      res.status(200).json({ quests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
