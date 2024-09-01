"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const special_controller_1 = __importDefault(require("../controllers/special.controller"));
const auth = auth_middleware_1.authenticateJWT;
const special = (0, express_1.Router)();
special.put("/update/:charId", auth, special_controller_1.default.Updatespecials);
exports.default = special;
//# sourceMappingURL=special.route.js.map