import mongoose from "mongoose"
import { db_url } from "./app.config"

const connectDB = async () => {
  try {
    await mongoose.connect(db_url)

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
