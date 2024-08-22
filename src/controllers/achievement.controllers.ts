import { Request, Response } from "express"
import { IAchievement, Achievement } from "../models/achievement.models"
import { ObjectId } from "mongoose";

export default {
    async createAchieve(
        req: Request<{ body: IAchievement; achievementId: ObjectId }>,
        res: Response
    ) {
        try {
            const { name, description, criteria,achieveAt } = req.body
            const { achievementId } = req.params

            const newAchievement = await Achievement.create({
                achievementId,
                name,
                description,
                criteria,
                achieveAt
            })

            res.status(201).json({
                message: "Work successful!",
                work: newAchievement
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    },

    async getAchievement(
        req: Request<{ achieveId: string; body: IAchievement }>,
        res: Response
    ) {
        try {
            const { achieveId } = req.params

            const getAchievement = await Achievement.findById(achieveId)

            if (!getAchievement) {
                return res.status(404).json({ error: "Achievement not found" })
            }

            res.status(200).json({
                message: "Achievement retrieved successfully!",
                work: getAchievement
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    },

    async updateAchieve(
        req: Request<{ achieveId: string; body: IAchievement }>,
        res: Response
    ) {
        try {
            const { name, description, criteria, achieveAt } = req.body
            const { achieveId } = req.params

            const updateAchieve = await Achievement.findByIdAndUpdate(
                achieveId,
                { name, description, criteria, achieveAt },
                { new: true }
            )

            if (!updateAchieve) {
                return res.status(404).json({ error: "Achievement not found" })
            }
            res.status(200).json({
                message: "Achievement updated successfully!",
                work: updateAchieve
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    },

    async deleteAchievement(
        req: Request<{ achieveId: string }>,
        res: Response
    ) {
        try {
            const { achieveId } = req.params

            const deletedAchievement = await Achievement.findByIdAndDelete(achieveId)

            if (!deletedAchievement) {
                return res.status(404).json({ error: "Achievement not found" })
            }

            res.status(200).json({
                message: "Achievement deleted successfully!",
                work: deletedAchievement
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}