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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const work_model_1 = require("../models/work.model");
const mongoose_1 = __importDefault(require("mongoose"));
const workPipeline = (match = {}) => [
    {
        $match: match
    },
    {
        $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "workId",
            as: "tasks"
        }
    },
    {
        $project: {
            _id: 1,
            characterId: 1,
            name: 1,
            description: 1,
            start_date: 1,
            due_date: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            tasks: {
                $map: {
                    input: "$tasks",
                    as: "task",
                    in: {
                        _id: "$$task._id",
                        name: "$$task.name",
                        description: "$$task.description",
                        difficulty: "$$task.difficulty",
                        start_date: "$$task.start_date",
                        due_date: "$$task.due_date",
                        isDone: "$$task.isDone",
                        isFirst: "$$task.isFirst",
                        createdAt: "$$task.createdAt",
                        updatedAt: "$$task.updatedAt"
                    }
                }
            }
        }
    }
];
exports.default = {
    createWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, start_date, due_date, status } = req.body;
                const { characterId } = req.params;
                const newWork = yield work_model_1.Work.create({
                    characterId,
                    name,
                    description,
                    start_date,
                    due_date,
                    status
                });
                res.status(201).json({
                    message: "Work created successfully!",
                    work: newWork
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const { name, description, start_date, due_date, status } = req.body;
                const updatedWork = yield work_model_1.Work.findByIdAndUpdate(workId, { name, description, start_date, due_date, status }, { new: true });
                if (!updatedWork) {
                    return res.status(404).json({ error: "Work not found" });
                }
                res.status(200).json({
                    message: "Work updated successfully!",
                    work: updatedWork
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const deletedWork = yield work_model_1.Work.findByIdAndDelete(workId);
                if (!deletedWork) {
                    return res.status(404).json({ error: "Work not found" });
                }
                res.status(200).json({
                    message: "Work deleted successfully!",
                    work: deletedWork
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const pipeline = workPipeline({
                    _id: new mongoose_1.default.Types.ObjectId(workId)
                });
                const result = yield work_model_1.Work.aggregate(pipeline).exec();
                if (!result) {
                    return res.status(404).json({ error: "Work not found" });
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAllWorks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { characterId } = req.params;
                const pipeline = workPipeline({
                    characterId: new mongoose_1.default.Types.ObjectId(characterId)
                });
                const result = yield work_model_1.Work.aggregate(pipeline).exec();
                res.status(200).json(result);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=work.controller.js.map