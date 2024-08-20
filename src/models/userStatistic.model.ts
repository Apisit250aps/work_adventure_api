import { Schema, model, Document } from "mongoose"
import { ObjectId } from "mongodb"

// Interface extending Document to include Mongoose document properties
export interface IUserStatistics extends Document {
  userId?: ObjectId
  totalExp: number
  totalCoin: number
  totalQuests: number
  totalAchievements?: number
  createdAt: Date
  updatedAt: Date
}

// Define the Mongoose schema for user statistics
const UserStatisticsSchema = new Schema<IUserStatistics>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  totalExp: { type: Number, required: true, default: 0 },
  totalCoin: { type: Number, required: true, default: 0 },
  totalQuests: { type: Number, required: true, default: 0 },
  totalAchievements: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Pre-save hook to update `updatedAt` field on every save
UserStatisticsSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Create the Mongoose model
export const UserStatistics = model<IUserStatistics>(
  "UserStatistics",
  UserStatisticsSchema
)