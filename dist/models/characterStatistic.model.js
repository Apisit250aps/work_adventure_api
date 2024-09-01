"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterStatistics = void 0;
const mongoose_1 = require("mongoose");
// Create the schema for CharacterStatistics
const CharacterStatisticsSchema = new mongoose_1.Schema({
    characterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Character", required: true },
    totalExp: { type: Number, required: true, default: 0 },
    totalCoin: { type: Number, required: true, default: 0 },
    totalQuests: { type: Number, required: true, default: 0 },
    totalAchievements: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
CharacterStatisticsSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create and export the model for CharacterStatistics
exports.CharacterStatistics = (0, mongoose_1.model)("CharacterStatistics", CharacterStatisticsSchema);
//# sourceMappingURL=characterStatistic.model.js.map