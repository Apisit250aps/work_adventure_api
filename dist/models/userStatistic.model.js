"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatistics = void 0;
const mongoose_1 = require("mongoose");
// Define the Mongoose schema for user statistics
const UserStatisticsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    totalExp: { type: Number, required: true, default: 0 },
    totalCoin: { type: Number, required: true, default: 0 },
    totalQuests: { type: Number, required: true, default: 0 },
    totalAchievements: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
// Pre-save hook to update `updatedAt` field on every save
UserStatisticsSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the Mongoose model
exports.UserStatistics = (0, mongoose_1.model)("UserStatistics", UserStatisticsSchema);
//# sourceMappingURL=userStatistic.model.js.map