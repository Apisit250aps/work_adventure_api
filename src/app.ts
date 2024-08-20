import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import auth from "./routers/auth.route"
import router from "./routers/index.route"
// define app
const app = express()
// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("dev"))
// index route
app.use("/", router)

export default app
