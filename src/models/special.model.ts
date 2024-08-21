/** @format */

import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

// Define the ISpecial interface extending Document
export interface ISpecial extends Document {
  specialId?: ObjectId;
  charId: Types.ObjectId;

  strength: number;
  perception: number;
  endurance: number;
  charisma: number;
  intelligence: number;
  agility: number;
  luck: number;

  createdAt: Date;
  updatedAt: Date;
}

// Define the Special schema
const SpecialSchema: Schema<ISpecial> = new Schema(
  {
    charId: {
      type: Schema.Types.ObjectId,
      ref: "Character", // Referencing the Character model
      required: true,
    },
    strength: {
      type: Number,
      default: 1,
    },
    perception: {
      type: Number,
      default: 1,
    },
    endurance: {
      type: Number,
      default: 1,
    },
    charisma: {
      type: Number,
      default: 1,
    },
    intelligence: {
      type: Number,
      default: 1,
    },
    agility: {
      type: Number,
      default: 1,
    },
    luck: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to update `updatedAt` before certain operations
SpecialSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

SpecialSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Create the Special model
export const Special = mongoose.model<ISpecial>("Special", SpecialSchema);
