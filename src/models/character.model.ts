/** @format */

import mongoose, { Schema, Document, Types, ObjectId } from "mongoose"

// Define the ICharacter interface extending Document
export interface ICharacter extends Document {
  charId?: ObjectId
  userId: Types.ObjectId
  name: string
  avatarIndex?: number
  className?: string
  exp?: number
  level?: number
  coin?: number
  health?: number
  stamina?: number
  focus_point?: number
  createdAt: Date
  updatedAt: Date
}

// Define the Character schema
const CharacterSchema: Schema<ICharacter> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    avatarIndex: {
      type: Number,
      required: false,
      default: 0
    },
    className: {
      type: String,
      required: false
    },
    exp: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    coin: {
      type: Number,
      default: 0
    },
    health: {
      type: Number,
      default: 100
    },
    stamina: {
      type: Number,
      default: 100
    },
    focus_point: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  }
)

// Middleware to update `updatedAt` before certain operations
CharacterSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

CharacterSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

// Create the Character model
export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
)
