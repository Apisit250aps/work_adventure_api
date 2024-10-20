import { Response, Request } from "express"
import { User, IUser } from "../models/user.model"
import { IUserStatistics, UserStatistics } from "../models/userStatistic.model"
import mongoose from "mongoose"
import { Character } from "../models/character.model"

const userPipeline = (match: {}) => [
  {
    $match: match
  },
  {
    $lookup: {
      from: "userstatistics",
      localField: "_id",
      foreignField: "userId",
      as: "userStatistics"
    }
  },
  {
    $unwind: {
      path: "$userStatistics",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "characters",
      localField: "_id",
      foreignField: "userId",
      as: "characters"
    }
  },
  {
    $project: {
      username: 1,
      email: 1,
      fname: 1,
      lname: 1,
      isAdmin: 1,
      createdAt: 1,
      updatedAt: 1,
      "userStatistics.totalExp": 1,
      "userStatistics.totalCoin": 1,
      "userStatistics.totalQuests": 1,
      "userStatistics.totalAchievements": 1,
      "userStatistics.createdAt": 1,
      "userStatistics.updatedAt": 1,
      characters: {
        $map: {
          input: "$characters",
          as: "character",
          in: {
            _id: "$$character._id",
            name: "$$character.name",
            exp: "$$character.exp",
            level: "$$character.level",
            className: "$$character.className",
            coin: "$$character.coin",
            health: "$$character.health",
            stamina: "$$character.stamina",
            focus_point: "$$character.focus_point",
            createdAt: "$$character.createdAt",
            updatedAt: "$$character.updatedAt"
          }
        }
      }
    }
  }
]

async function updateUser(req: Request<{ body: IUser }>, res: Response) {
  try {
    const userId = req.user?._id
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" })
    }

    const result = await User.findOneAndUpdate(
      { userId },
      { ...req.body },
      {
        new: true
      }
    )

    if (!result) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json({ result })
  } catch (error) {
    res.send(500).json({ error })
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" })
    }

    const deletedUser = await User.findOneAndDelete({ userId })

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" })
    }

    res
      .status(200)
      .json({ message: "User successfully deleted", result: deletedUser })
  } catch (error) {
    res.status(500).json({ error })
  }
}

async function userStatisticUpdate(
  req: Request<{ body: IUserStatistics; userStatisticId: String }>,
  res: Response
) {
  try {
    const { userStatisticId } = req.params
    await UserStatistics.findByIdAndUpdate(
      { _id: userStatisticId },
      { ...req.body },
      { new: true }
    ).then((result) => {
      if (result) {
        res.status(200).json({ result })
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

async function userData(req: Request, res: Response) {
  try {
    const pipeline = userPipeline({ _id: req.user?._id })
    const result = await User.aggregate(pipeline).exec()
    res.json(result)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data." })
  }
}

interface UserStats {
  userId: mongoose.Types.ObjectId
  username?: string
  totalFocusPoint: number
  totalCoin: number
  totalPoints: number
}

async function getUserStats(
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> {
  try {
    const userId = req.params.userId
      ? new mongoose.Types.ObjectId(req.params.userId)
      : undefined

    const aggregationPipeline: mongoose.PipelineStage[] = [
      ...(userId ? [{ $match: { userId: userId } }] : []),
      {
        $group: {
          _id: "$userId",
          totalFocusPoint: { $sum: { $ifNull: ["$focus_point", 0] } },
          totalCoin: { $sum: { $ifNull: ["$coin", 0] } }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id", // ปรับตรงนี้ถ้า field ใน users collection ไม่ใช่ _id
          as: "userInfo"
        }
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: { $ifNull: ["$userInfo.username", "Unknown"] }, // เพิ่ม fallback value
          totalFocusPoint: 1,
          totalCoin: 1,
          totalPoints: { $add: ["$totalFocusPoint", "$totalCoin"] }
        }
      },
      {
        $sort: { totalPoints: -1 }
      }
    ]

    const stats: UserStats[] = await Character.aggregate(aggregationPipeline)

    if (userId && stats.length === 0) {
      res.status(404).json({ message: "User not found or has no characters" })
    } else {
      res.status(200).json(stats)
    }
  } catch (error) {
    console.error("Error in getUserStats:", error)
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message
    })
  }
}

export default {
  updateUser,
  deleteUser,
  userData,
  userStatisticUpdate,
  getUserStats
}
