"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const special_controller_1 = __importDefault(require("../controllers/special.controller"));
const special = (0, express_1.Router)();
special.use(auth_middleware_1.authenticateJWT);
special.post("/create/:charId", special_controller_1.default.createSpecial);
special.put("/update/:specialId", special_controller_1.default.updateSpecial);
special.delete("/delete/:specialId", special_controller_1.default.deleteSpecial);
special.get("/get/:specialId", special_controller_1.default.getSpecial);
special.get("/:charId", special_controller_1.default.getAllSpecials);
exports.default = special;
//# sourceMappingURL=special.route.js.map