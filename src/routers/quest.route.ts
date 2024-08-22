import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import questController from "../controllers/quest.controller";

const quest = Router();
quest.use(authenticateJWT);

quest.post("/create", questController.createQuest); // Create a new quest
quest.put("/update/:questId", questController.updateQuest); // Update an existing quest by ID
quest.delete("/delete/:questId", questController.deleteQuest); // Delete a quest by ID
quest.get("/get/:questId", questController.getQuest); // Get a quest by ID
quest.get("/all", questController.getAllQuests); // Get all quests

export default quest;
