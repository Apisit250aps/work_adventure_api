"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const achievement_controllers_1 = __importDefault(require("../controllers/achievement.controllers"));
const achieve = (0, express_1.Router)();
achieve.post("/createAchieve", achievement_controllers_1.default.createAchieve);
achieve.put("updateAchieve", achievement_controllers_1.default.updateAchieve);
achieve.delete("deleteAchieve", achievement_controllers_1.default.deleteAchievement);
achieve.use(auth_middleware_1.authenticateJWT);
exports.default = achieve;
//# sourceMappingURL=achievement.route.js.map