import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface IQuest extends Document {
    name: string
    description?: string
    type?: string
    start_date?: Date
    due_date?: Date
    status?: "todo" | "inprogress" | "done"
    createdAt: Date
    updatedAt: Date
  }

  const QuestSchema = new Schema<IQuest>(
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      type: { type: String, enum: ['Daily', 'Weekly'], default: 'Daily' },
      start_date: { type: Date, required: false },
      due_date: { type: Date, required: false },
      status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
    },
    {
      timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
    }
  );
  
  export const Quest = mongoose.model<IQuest>('Quest', QuestSchema);
  
   

