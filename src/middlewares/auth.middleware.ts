import { Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"
import { IUser, User } from "../models/user.model"
import { ICharacter } from "../models/character.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser // Add optional user property
      headers: {
        authorization?: string
      }
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      character?: ICharacter; // Add optional user property
      headers: {
        authorization?: string;
      };
    }
  }
}

export const authenticateJWT = async (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1] // Assuming the token is in the format "Bearer <token>"

    try {
      const decoded = verifyToken(token) as IUser // Ensure that decoded is of type IUser
      const user = await User.findById(decoded.userId) // ตรวจสอบว่าผู้ใช้ยังมีอยู่ในฐานข้อมูล

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      req.user = user // Save user information to request object
      next()

    } catch (error) {
      return res.status(403).json({ error: "Forbidden" })
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" })
  }
}
