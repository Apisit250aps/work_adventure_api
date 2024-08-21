import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IAchievement extends Document {
  achievementId: ObjectId;
  name: string;
  description: string;
  criteria: string;
  userId?: ObjectId;
  achieveAt: Date;
  conditionId: ObjectId;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    criteria: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    achieveAt: { type: Date },
    conditionId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

AchievementSchema.pre("save", function (next) {
  this.achieveAt = new Date();
  next();
});

export default mongoose.model<IAchievement>("Achievement", AchievementSchema);