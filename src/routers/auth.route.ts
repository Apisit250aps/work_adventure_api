import { Router } from "express"
import authController from "../controllers/auth.controller"
import { authenticateJWT } from "../middlewares/auth.middleware";

const auth = Router()
auth.post("/register", authController.userRegister)
auth.post("/login", authController.userLogin)

auth.use(authenticateJWT)

export default auth
