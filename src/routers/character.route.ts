/** @format */

import { Router } from "express";
import charController from "../controllers/character.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const auth = authenticateJWT;

const character = Router();
character.get('/', auth, charController.myCharacter)
character.post("/create", auth, charController.createCharacter);
character.get("/get/:charId", auth, charController.getCharacter);
character.put("/update/:charId", auth, charController.updateCharacter);
character.delete("/delete/:charId", auth, charController.deleteCharacter);

export default character;
