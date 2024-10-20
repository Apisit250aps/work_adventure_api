import { Router } from "express"
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const user = Router()
user.use(authenticateJWT)
user.get("/data", userController.userData)
user.put("/update/statistic/:userStatisticId", userController.userStatisticUpdate)
user.get('/ranking/:userId', userController.getUserStats)
user.get('/ranking', userController.getUserStats)
export default user
