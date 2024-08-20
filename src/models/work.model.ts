import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IWork extends Document {
    characterId?: ObjectId
    name: string
    description?: string
    start_date?: Date
    due_date?: Date
    status: "todo" | "inprogress" | "done"
    createdAt: Date
    updatedAt: Date
  }

  const WorkSchema: Schema<IWork> = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' }, // Assuming characterId references another model
    name: { type: String, required: true },
    description: { type: String },
    start_date: { type: Date, required: false },
    due_date: { type: Date, required: false},
    status: { type: String, enum: ['todo', 'inprogress', 'done'], required: true },
  }, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
  });
  
  // Create the model using the schema
  export const Work = mongoose.model<IWork>('Work', WorkSchema);
  
