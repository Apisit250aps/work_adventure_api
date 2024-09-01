"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const achievement_models_1 = require("../models/achievement.models");
exports.default = {
    createAchieve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, criteria, achieveAt } = req.body;
                const { achievementId } = req.params;
                const newAchievement = yield achievement_models_1.Achievement.create({
                    achievementId,
                    name,
                    description,
                    criteria,
                    achieveAt
                });
                res.status(201).json({
                    message: "Work successful!",
                    work: newAchievement
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAchievement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { achieveId } = req.params;
                const getAchievement = yield achievement_models_1.Achievement.findById(achieveId);
                if (!getAchievement) {
                    return res.status(404).json({ error: "Achievement not found" });
                }
                res.status(200).json({
                    message: "Achievement retrieved successfully!",
                    work: getAchievement
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateAchieve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, criteria, achieveAt } = req.body;
                const { achieveId } = req.params;
                const updateAchieve = yield achievement_models_1.Achievement.findByIdAndUpdate(achieveId, { name, description, criteria, achieveAt }, { new: true });
                if (!updateAchieve) {
                    return res.status(404).json({ error: "Achievement not found" });
                }
                res.status(200).json({
                    message: "Achievement updated successfully!",
                    work: updateAchieve
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteAchievement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { achieveId } = req.params;
                const deletedAchievement = yield achievement_models_1.Achievement.findByIdAndDelete(achieveId);
                if (!deletedAchievement) {
                    return res.status(404).json({ error: "Achievement not found" });
                }
                res.status(200).json({
                    message: "Achievement deleted successfully!",
                    work: deletedAchievement
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=achievement.controllers.js.map