import { Router } from 'express';
import { authenticateJWT } from "../middlewares/auth.middleware"
import achievementControllers from "../controllers/achievement.controllers";

const achieve = Router()
achieve.post("/createAchieve", achievementControllers.createAchieve)
achieve.put("updateAchieve", achievementControllers.updateAchieve)
achieve.delete("deleteAchieve", achievementControllers.deleteAchievement)
achieve.use(authenticateJWT)

export default achieve