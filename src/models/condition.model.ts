import mongoose, { Schema, Document } from "mongoose";

export interface ICondition extends Document {
  conditionId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  threshold: number;
  type: string;
}

const ConditionSchema = new Schema<ICondition>(
  {
    conditionId: {
      type: Schema.Types.ObjectId,
      ref: "Condition",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const condition = mongoose.model<ICondition>("Condition", ConditionSchema);