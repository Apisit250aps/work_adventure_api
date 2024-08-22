/** @format */

import { Router, Request, Response } from "express";
import auth from "./auth.route";
import work from "./work.route";
import character from "./character.route";
import quest from "./quest.route";


import task from "./tasks.route";
import user from "./user.route"
const router = Router()
router.get("/", (req: Request, res: Response) => {
  res.send("Hello World").status(200)
})
//
router.use("/auth", auth)
router.use("/user", user)
router.use("/character", character)
router.use("/work", work)
router.use("/quest", quest)
router.use("/tasks", task)

export default router
