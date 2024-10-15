import jwt from "jsonwebtoken"
import { secret_key } from "../configs/app.config"

const SECRET_KEY = secret_key as string

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "90d" })
}

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error("Invalid token")
  }
}
