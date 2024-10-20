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
const quest_model_1 = require("../models/quest.model");
exports.default = {
    createQuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, type, start_date, due_date, status } = req.body;
                const newQuest = yield quest_model_1.Quest.create({
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
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateQuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { questId } = req.params;
                const { name, description, type, start_date, due_date, status } = req.body;
                const updatedQuest = yield quest_model_1.Quest.findByIdAndUpdate(questId, { name, description, type, start_date, due_date, status }, { new: true });
                if (!updatedQuest) {
                    return res.status(404).json({ error: "Quest not found" });
                }
                res.status(200).json({
                    message: "Quest updated successfully!",
                    quest: updatedQuest,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteQuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { questId } = req.params;
                const deletedQuest = yield quest_model_1.Quest.findByIdAndDelete(questId);
                if (!deletedQuest) {
                    return res.status(404).json({ error: "Quest not found" });
                }
                res.status(200).json({
                    message: "Quest deleted successfully!",
                    quest: deletedQuest,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getQuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { questId } = req.params;
                const quest = yield quest_model_1.Quest.findById(questId);
                if (!quest) {
                    return res.status(404).json({ error: "Quest not found" });
                }
                res.status(200).json({ quest });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAllQuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quests = yield quest_model_1.Quest.find();
                res.status(200).json({ quests });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=quest.controller.js.map