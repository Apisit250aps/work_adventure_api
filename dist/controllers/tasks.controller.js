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
const tasks_model_1 = require("../models/tasks.model");
exports.default = {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const newTask = yield tasks_model_1.Task.create(Object.assign(Object.assign({}, req.body), { workId }));
                res.status(201).json({
                    message: "Task created successfully!",
                    task: newTask
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.params;
                const updatedTask = yield tasks_model_1.Task.findByIdAndUpdate(taskId, Object.assign({}, req.body), { new: true });
                if (!updatedTask) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.status(200).json({
                    message: "Task updated successfully!",
                    task: updatedTask
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.params;
                const deletedTask = yield tasks_model_1.Task.findByIdAndDelete(taskId);
                if (!deletedTask) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.status(200).json({
                    message: "Task deleted successfully!",
                    task: deletedTask
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.params;
                const task = yield tasks_model_1.Task.findById(taskId);
                if (!task) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.status(200).json({ task });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const tasks = yield tasks_model_1.Task.find({ workId });
                res.status(200).json({ tasks });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=tasks.controller.js.map