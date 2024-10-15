import { Request, Response } from "express"
import { comparePasswords, hashPassword } from "../utils/password"
import { IUser, User } from "../models/user.model"
import { generateToken } from "../utils/jwt"
import { UserStatistics } from "../models/userStatistic.model"
import { Character, ICharacter } from "../models/character.model"
import { CharacterStatistics } from "../models/characterStatistic.model"

export default {
  async userRegister(req: Request<{ body: IUser }>, res: Response) {
    try {
      const { username, password, email } = req.body
      console.log(req.body)
      const existingUser = await User.findOne({ username: username })
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" })
      }

      const hashedPassword = await hashPassword(password)
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email
      })

      await UserStatistics.create({ userId: newUser })
      return res.status(201).json({ newUser })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
  },
  async userLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" })
      }
      const isPasswordValid = await comparePasswords(
        password,
        user.password as any
      )
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" })
      }
      const token = generateToken({
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      })
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
  },
  async checkAuth(req: Request, res: Response) {
    try {
      const user = (await User.findOne({ _id: req.user?._id })) as IUser
      const { password, ...userWithoutPassword } = user.toObject()
      return res.status(200).json(userWithoutPassword)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}
