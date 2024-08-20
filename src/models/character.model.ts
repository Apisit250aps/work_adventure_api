/** @format */

import mongoose, { Schema, Document, Types } from "mongoose";

// Define the ICharacter interface extending Document
export interface ICharacter extends Document {
  charId?: Types.ObjectId;
  name: string;
  exp?: number;
  level?: number;
  coin?: number;
  health?: number;
  stamina?: number;
  focus_point?: number;
  userId: Types.ObjectId[]; // Array of user IDs for multiple users
  createdAt: Date;
  updatedAt: Date;
}

// Define the Character schema
const CharacterSchema: Schema<ICharacter> = new Schema(
  {
    charId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    exp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    coin: {
      type: Number,
      default: 0,
    },
    health: {
      type: Number,
      default: 100,
    },
    stamina: {
      type: Number,
      default: 100,
    },
    focus_point: {
      type: Number,
      default: 0,
    },
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ], // Array of user IDs
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to update `updatedAt` before certain operations
CharacterSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

CharacterSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Create the Character model
export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);
