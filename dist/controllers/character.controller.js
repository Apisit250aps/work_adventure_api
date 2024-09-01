"use strict";
/** @format */
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
const character_model_1 = require("../models/character.model");
const special_model_1 = require("../models/special.model");
const characterStatistic_model_1 = require("../models/characterStatistic.model");
exports.default = {
    createCharacter(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const newCharacter = yield character_model_1.Character.create(Object.assign(Object.assign({}, req.body), { userId: userId }));
                yield characterStatistic_model_1.CharacterStatistics.create({
                    characterId: newCharacter._id
                });
                // Create a new Special associated with this character
                const newSpecial = yield special_model_1.Special.create({
                    charId: newCharacter._id // Assuming you have a characterId field in Special schema
                    // Add any additional default properties or values if required by Special
                });
                return res.status(201).json({
                    character: newCharacter,
                    special: newSpecial
                });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    },
    getCharacter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { charId } = req.params;
                const characters = yield character_model_1.Character.find({ _id: charId });
                return res.json({ characters });
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    },
    updateCharacter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { charId } = req.params;
                const updatedCharacter = yield character_model_1.Character.findByIdAndUpdate(charId, Object.assign({}, req.body), { new: true });
                return res.json(updatedCharacter);
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    },
    deleteCharacter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { charId } = req.params;
                const deletedCharacter = yield character_model_1.Character.findByIdAndDelete(charId);
                return res.json({
                    message: "Character deleted successfully",
                    deletedCharacter
                });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: error || "An unexpected error occurred" });
            }
        });
    }
};
//# sourceMappingURL=character.controller.js.map