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
const condition_model_1 = require("./../models/condition.model");
exports.default = {
    createCondition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, threshold, type } = req.body;
                const newCondition = yield condition_model_1.condition.create({
                    name,
                    description,
                    threshold,
                    type
                });
                res.status(201).json({
                    message: "Condition created successfully!",
                    condition: newCondition
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAllConditions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conditions = yield condition_model_1.condition.find();
                res.status(200).json(conditions);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getConditionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conditions = yield condition_model_1.condition.findById(req.params.id);
                if (!condition_model_1.condition) {
                    return res.status(404).json({ error: "Condition not found" });
                }
                res.status(200).json(condition_model_1.condition);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateCondition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCondition = yield condition_model_1.condition.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!updatedCondition) {
                    return res.status(404).json({ error: "Condition not found" });
                }
                res.status(200).json({
                    message: "Condition updated successfully",
                    condition: updatedCondition
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteCondition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCondition = yield condition_model_1.condition.findByIdAndDelete(req.params.id);
                if (!deletedCondition) {
                    return res.status(404).json({ error: "Condition not found" });
                }
                res.status(200).json({
                    message: "Condition deleted successfully",
                    condition: deletedCondition
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=condition.controller.js.map