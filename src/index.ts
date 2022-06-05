import { app } from "./server"
import { taskRouter } from "./routers/taskRouter"
import { Request, Response } from "express"

app.use("/api/tasks", taskRouter)

app.use("*", (req: Request, res: Response) => {
  return res.status(404).send("404 Not Found")
})

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`)
})
