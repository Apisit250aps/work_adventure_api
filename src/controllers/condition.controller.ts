import { condition, ICondition } from './../models/condition.model';
import { Request, Response } from "express";


export default {
    async createCondition(
        req: Request<{}, {}, ICondition>,
        res: Response
    ) {
        try {
            const { name, description, threshold, type } = req.body;

            const newCondition = await condition.create({
                name,
                description,
                threshold,
                type
            });

            res.status(201).json({
                message: "Condition created successfully!",
                condition: newCondition
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getAllConditions(req: Request, res: Response) {
        try {
            const conditions = await condition.find();
            res.status(200).json(conditions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getConditionById(req: Request<{ id: string }>, res: Response) {
        try {
            const conditions = await condition.findById(req.params.id);
            if (!condition) {
                return res.status(404).json({ error: "Condition not found" });
            }
            res.status(200).json(condition);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateCondition(
        req: Request<{ id: string }, {}, Partial<ICondition>>,
        res: Response
    ) {
        try {
            const updatedCondition = await condition.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedCondition) {
                return res.status(404).json({ error: "Condition not found" });
            }
            res.status(200).json({
                message: "Condition updated successfully",
                condition: updatedCondition
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async deleteCondition(req: Request<{ id: string }>, res: Response) {
        try {
            const deletedCondition = await condition.findByIdAndDelete(req.params.id);
            if (!deletedCondition) {
                return res.status(404).json({ error: "Condition not found" });
            }
            res.status(200).json({
                message: "Condition deleted successfully",
                condition: deletedCondition
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};