/** @format */

import { Router, Request, Response } from "express";
import auth from "./auth.route";
import work from "./work.route";
import character from "./character.route";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Hello World").status(200);
});
//
router.use("/auth", auth)
router.use("/character", character);
router.use("/work", work)

export default router;
