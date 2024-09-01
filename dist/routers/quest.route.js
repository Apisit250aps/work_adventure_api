"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const quest_controller_1 = __importDefault(require("../controllers/quest.controller"));
const quest = (0, express_1.Router)();
quest.use(auth_middleware_1.authenticateJWT);
quest.post("/create", quest_controller_1.default.createQuest); // Create a new quest
quest.put("/update/:questId", quest_controller_1.default.updateQuest); // Update an existing quest by ID
quest.delete("/delete/:questId", quest_controller_1.default.deleteQuest); // Delete a quest by ID
quest.get("/get/:questId", quest_controller_1.default.getQuest); // Get a quest by ID
quest.get("/all", quest_controller_1.default.getAllQuests); // Get all quests
exports.default = quest;
//# sourceMappingURL=quest.route.js.map