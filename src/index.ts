import app from "./app"
import { port } from "./configs/app.config"

app.listen(port, async () => {
  console.log(`Server listen on http://localhost:${port}/`)
})
