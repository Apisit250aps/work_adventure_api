import { Schema, model, Document, ObjectId } from "mongoose"

export interface ICharacterStatistics extends Document {
    characterId: ObjectId
    totalExp?: number
    totalCoin?: number
    totalQuests?: number
    totalAchievements?: number
    createdAt: Date
    updatedAt: Date
}

// Create the schema for CharacterStatistics
const CharacterStatisticsSchema = new Schema<ICharacterStatistics>({
    characterId: { type: Schema.Types.ObjectId, ref: "Character", required: true },
    totalExp: { type: Number, required: true, default: 0 },
    totalCoin: { type: Number, required: true, default: 0 },
    totalQuests: { type: Number, required: true, default: 0 },
    totalAchievements: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

CharacterStatisticsSchema.pre("save", function (next) {
    this.updatedAt = new Date()
    next()
  })
  
// Create and export the model for CharacterStatistics
export const CharacterStatistics = model<ICharacterStatistics>("CharacterStatistics", CharacterStatisticsSchema);

 