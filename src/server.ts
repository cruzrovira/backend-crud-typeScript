import express from "express"
import morgan from "morgan"
import cors from "cors"
import fileupload from "express-fileupload"
import "dotenv/config"
import "./services/mongoose"

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
)

export { app }
