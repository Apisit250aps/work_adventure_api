import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware"
import specialController from "../controllers/special.controller"

const special = Router()

special.use(authenticateJWT)

special.post("/create/:charId", specialController.createSpecial)
special.put("/update/:specialId", specialController.updateSpecial)
special.delete("/delete/:specialId", specialController.deleteSpecial)
special.get("/get/:specialId", specialController.getSpecial)
special.get("/:charId", specialController.getAllSpecials)

export default special