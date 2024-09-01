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
const user_model_1 = require("../models/user.model");
const userStatistic_model_1 = require("../models/userStatistic.model");
const userPipeline = (match) => [
    {
        $match: match
    },
    {
        $lookup: {
            from: "userstatistics",
            localField: "_id",
            foreignField: "userId",
            as: "userStatistics"
        }
    },
    {
        $unwind: {
            path: "$userStatistics",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $lookup: {
            from: "characters",
            localField: "_id",
            foreignField: "userId",
            as: "characters"
        }
    },
    {
        $project: {
            username: 1,
            email: 1,
            fname: 1,
            lname: 1,
            isAdmin: 1,
            createdAt: 1,
            updatedAt: 1,
            "userStatistics.totalExp": 1,
            "userStatistics.totalCoin": 1,
            "userStatistics.totalQuests": 1,
            "userStatistics.totalAchievements": 1,
            "userStatistics.createdAt": 1,
            "userStatistics.updatedAt": 1,
            characters: {
                $map: {
                    input: "$characters",
                    as: "character",
                    in: {
                        _id: "$$character._id",
                        name: "$$character.name",
                        exp: "$$character.exp",
                        level: "$$character.level",
                        className: "$$character.className",
                        coin: "$$character.coin",
                        health: "$$character.health",
                        stamina: "$$character.stamina",
                        focus_point: "$$character.focus_point",
                        createdAt: "$$character.createdAt",
                        updatedAt: "$$character.updatedAt"
                    }
                }
            }
        }
    }
];
function updateUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!userId) {
                return res.status(400).json({ error: "User ID is missing" });
            }
            const result = yield user_model_1.User.findOneAndUpdate({ userId }, Object.assign({}, req.body), {
                new: true
            });
            if (!result) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ result });
        }
        catch (error) {
            res.send(500).json({ error });
        }
    });
}
function deleteUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(400).json({ error: "User ID is missing" });
            }
            const deletedUser = yield user_model_1.User.findOneAndDelete({ userId });
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res
                .status(200)
                .json({ message: "User successfully deleted", result: deletedUser });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
function userStatisticUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userStatisticId } = req.params;
            yield userStatistic_model_1.UserStatistics.findByIdAndUpdate({ _id: userStatisticId }, Object.assign({}, req.body), { new: true }).then((result) => {
                if (result) {
                    res.status(200).json({ result });
                }
            });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
function userData(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pipeline = userPipeline({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
            const result = yield user_model_1.User.aggregate(pipeline).exec();
            res.json(result);
        }
        catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ message: "An error occurred while fetching user data." });
        }
    });
}
exports.default = {
    updateUser,
    deleteUser,
    userData,
    userStatisticUpdate
};
//# sourceMappingURL=user.controller.js.map