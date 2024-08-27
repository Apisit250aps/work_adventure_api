import { Response, Request } from "express"
import { User, IUser } from "../models/user.model"
import { IUserStatistics, UserStatistics } from "../models/userStatistic.model"

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
      { _id:userStatisticId },
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

export default {
  updateUser,
  deleteUser,
  userData,
  userStatisticUpdate
}
