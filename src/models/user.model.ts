import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IUser extends Document {
  userId?: ObjectId
  username: string
  email: string
  fname?: string
  lname?: string
  password: String
  isAdmin?: Boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  fname: { type: String, required: false },
  lname: { type: String, required: false },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

UserSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

export const User = mongoose.model<IUser>("User", UserSchema)
