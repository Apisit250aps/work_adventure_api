"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const character_controller_1 = __importDefault(require("../controllers/character.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth = auth_middleware_1.authenticateJWT;
const character = (0, express_1.Router)();
character.get('/', auth, character_controller_1.default.myCharacter);
character.post("/create", auth, character_controller_1.default.createCharacter);
character.get("/get/:charId", auth, character_controller_1.default.getCharacter);
character.put("/update/:charId", auth, character_controller_1.default.updateCharacter);
character.delete("/delete/:charId", auth, character_controller_1.default.deleteCharacter);
exports.default = character;
//# sourceMappingURL=character.route.js.map