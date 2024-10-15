import app from "./app"
import { port } from "./configs/app.config"
import connectDB from "./configs/db.config"

app.listen(port, () => {
  connectDB()
  console.log(`Server listen on http://localhost:${port}/`)
})
