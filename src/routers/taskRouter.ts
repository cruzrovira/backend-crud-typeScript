import { Router } from "express"
import { taskValidatePost } from "../validate/taskValidate"

import {
  getTasks,
  getTaskId,
  updateTask,
  saveTask,
  deleteTaskId,
} from "../controllers/taskController"
const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTaskId)
taskRouter.post("/", taskValidatePost, saveTask)
taskRouter.put("/", updateTask)
taskRouter.delete("/:id", deleteTaskId)

export { taskRouter }
