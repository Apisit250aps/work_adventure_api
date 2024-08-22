/** @format */

import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import specialController from "../controllers/special.controller";

const auth = authenticateJWT;

const special = Router();

special.put("/update/:id", auth, specialController.specials);

export default special;
