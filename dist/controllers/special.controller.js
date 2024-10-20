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
const mongoose_1 = __importDefault(require("mongoose"));
const special_model_1 = require("../models/special.model");
const specialPipeline = (match = {}) => [
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
exports.default = {
    createSpecial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { strength, perception, endurance, charisma, intelligence, agility, luck } = req.body;
                const { charId } = req.params;
                const newSpecial = yield special_model_1.Special.create({
                    charId: new mongoose_1.default.Types.ObjectId(charId),
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
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    updateSpecial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { specialId } = req.params;
                const updateData = req.body;
                console.log(updateData);
                const updatedSpecial = yield special_model_1.Special.findByIdAndUpdate(specialId, updateData, { new: true });
                if (!updatedSpecial) {
                    return res.status(404).json({ error: "Special stats not found" });
                }
                res.status(200).json({
                    message: "Special stats updated successfully!",
                    special: updatedSpecial
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    deleteSpecial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { specialId } = req.params;
                const deletedSpecial = yield special_model_1.Special.findByIdAndDelete(specialId);
                if (!deletedSpecial) {
                    return res.status(404).json({ error: "Special stats not found" });
                }
                res.status(200).json({
                    message: "Special stats deleted successfully!",
                    special: deletedSpecial
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getSpecial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { specialId } = req.params;
                const pipeline = specialPipeline({
                    _id: new mongoose_1.default.Types.ObjectId(specialId)
                });
                const result = yield special_model_1.Special.aggregate(pipeline).exec();
                if (!result || result.length === 0) {
                    return res.status(404).json({ error: "Special stats not found" });
                }
                res.status(200).json(result[0]);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    },
    getAllSpecials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { charId } = req.params;
                const pipeline = specialPipeline({
                    charId: new mongoose_1.default.Types.ObjectId(charId)
                });
                const result = yield special_model_1.Special.aggregate(pipeline).exec();
                res.status(200).json(result[0]);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
};
//# sourceMappingURL=special.controller.js.map