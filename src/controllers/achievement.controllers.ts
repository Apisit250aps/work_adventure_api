import { Request, Response } from "express"
import { IAchievement, Achievement } from "../models/achievement.models"
import { ObjectId } from "mongoose";
import work from '../routers/work.route';
import { error } from "console";


export default {
    async createWork(
        req: Request<{ body: IAchievement; achievementId: ObjectId }>,
        res: Response

    ) {
        try {
            const { name, description, criteria, userId, achieveAt } = req.body
            const { achievementId } = req.params

            const newAchievement = await Achievement.create({
                achievementId,
                name,
                description,
                criteria,
                userId,
                achieveAt

            })

            res.status(201).json({
                message: "Work successful!",
                work: newAchievement
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "error" })
        }
    },

    async getAchievement(
        req: Request<{ achieveId: string; body: IAchievement }>,
        res: Response
    ) {

        try {
            const { name, description, criteria, userId, achieveAt } = req.body
            const { achieveId } = req.params

            const getAchievement = await Achievement.findByIdAndUpdate(
                achieveId,
                { name, description, criteria, userId, achieveAt },
                { new: true }
            )

            if (!getAchievement) {
                return res.status(404).json({ error: "achieve not found" })
            }

            res.status(202).json({
                message: "achieve success!",
                work: getAchievement
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }


    }



}
