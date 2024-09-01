"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const work_controller_1 = __importDefault(require("../controllers/work.controller"));
const work = (0, express_1.Router)();
work.use(auth_middleware_1.authenticateJWT);
work.post("/create/:characterId", work_controller_1.default.createWork);
work.put("/update/:workId", work_controller_1.default.updateWork);
work.delete("/delete/:workId", work_controller_1.default.deleteWork);
work.get("/get/:workId", work_controller_1.default.getWork);
work.get("/all/:characterId", work_controller_1.default.getAllWorks);
exports.default = work;
//# sourceMappingURL=work.route.js.map