"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth = (0, express_1.Router)();
auth.post("/register", auth_controller_1.default.userRegister);
auth.post("/login", auth_controller_1.default.userLogin);
auth.use(auth_middleware_1.authenticateJWT);
auth.get("/check", auth_middleware_1.authenticateJWT, auth_controller_1.default.checkAuth);
exports.default = auth;
//# sourceMappingURL=auth.route.js.map