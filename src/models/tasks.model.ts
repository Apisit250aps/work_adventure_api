import mongoose, { Schema, Document, Types } from "mongoose"

export interface ITask extends Document {
  name: string
  description?: string
  difficulty: 1 | 2 | 3
  start_date?: Date
  due_date?: Date
  isDone?: boolean
  workId?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    description: { type: String },
    difficulty: { type: Number, required: false, enum: [1, 2, 3], default: 1 },
    start_date: { type: Date, required: false },
    due_date: { type: Date, required: false },
    isDone: { type: Boolean, default: false },
    workId: { type: Schema.Types.ObjectId, ref: "Work" }
  },
  {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  }
)

export const Task = mongoose.model<ITask>("Task", TaskSchema)
