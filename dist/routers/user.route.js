"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user = (0, express_1.Router)();
user.use(auth_middleware_1.authenticateJWT);
user.get("/data", user_controller_1.default.userData);
user.put("/update/statistic/:userStatisticId", user_controller_1.default.userStatisticUpdate);
user.get('/ranking/:userId', user_controller_1.default.getUserStats);
user.get('/ranking', user_controller_1.default.getUserStats);
exports.default = user;
//# sourceMappingURL=user.route.js.map