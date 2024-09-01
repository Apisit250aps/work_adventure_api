"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const work_route_1 = __importDefault(require("./work.route"));
const character_route_1 = __importDefault(require("./character.route"));
const quest_route_1 = __importDefault(require("./quest.route"));
const tasks_route_1 = __importDefault(require("./tasks.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World").status(200);
});
//
router.use("/auth", auth_route_1.default);
router.use("/user", user_route_1.default);
router.use("/character", character_route_1.default);
router.use("/work", work_route_1.default);
router.use("/quest", quest_route_1.default);
router.use("/tasks", tasks_route_1.default);
exports.default = router;
//# sourceMappingURL=index.route.js.map