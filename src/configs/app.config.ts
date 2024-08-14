import dotenv from "dotenv"

dotenv.config()

export const port = process.env.PORT || 3000
export const secret_key = process.env.SECRET_KEY
