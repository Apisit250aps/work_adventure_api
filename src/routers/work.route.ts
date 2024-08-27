import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware"
import workController from "../controllers/work.controller"

const work = Router()
work.use(authenticateJWT)
work.post("/create/:characterId", workController.createWork)
work.put("/update/:workId", workController.updateWork)
work.delete("/delete/:workId", workController.deleteWork)
work.get("/get/:workId", workController.getWork)
work.get("/all/:characterId", workController.getAllWorks)
export default work