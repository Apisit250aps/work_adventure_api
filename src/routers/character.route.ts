/** @format */

import { Router } from "express";
import charController from "../controllers/character.controller";

const character = Router();

character.post("/create", charController.createCharacter);
character.get("/get/:id", charController.getCharacter);
character.put("/update/:id", charController.updateCharacter);
character.delete("/delete/:id", charController.deleteCharacter);

export default character;