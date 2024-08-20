import { Router, Request, Response } from "express"
import auth from "./auth.route";

const router = Router()
router.get("/", (req: Request, res: Response) => {
  res.send("Hello World").status(200)
})

router.use("/auth", auth)

export default router
