/** @format */

import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import specialController from "../controllers/special.controller";

const auth = authenticateJWT;

const special = Router();

special.put("/update/:charId", auth, specialController.Updatespecials);

export default special;
