import app from "./app"
import { port } from "./configs/app.config"
import connectDB from "./configs/db.config"

app.listen(3000, "0.0.0.0", () => {
  connectDB()
<<<<<<< HEAD
  console.log(`Server listen on http://localhost:${port}/`)
=======
  console.log(`Server is listening on http://localhost:${3000}/`)
>>>>>>> develop
})
