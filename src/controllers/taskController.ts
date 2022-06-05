import { Request, Response } from "express"
import { TaskModel } from "../models/taskModel"
import { deleteImage, uploadImage } from "../lib/cloudinary"
import fs from "fs-extra"
import { UploadedFile } from "express-fileupload"

const getTasks = async (req: Request, res: Response) => {
  try {
    const options = {
      page: Number(req.query.limit) || 1,
      limit: Number(req.query.page) || 10,
    }
    const taskAgregate = TaskModel.aggregate()
    const tasks = await TaskModel.aggregatePaginate(taskAgregate, options)

    return res.json(tasks)
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las tareas",
      error,
    })
  }
}
const getTaskId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await TaskModel.findById(id)
    if (!task) {
      return res.status(404).json({ message: "No existe la tarea" })
    }
    return res.json(task)
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener la tarea",
      error,
    })
  }
}
const saveTask = async (req: Request, res: Response) => {
  try {
    const { task, comentario } = req.body
    let imagen
    console.log(req.files?.imagen)
    if (req.files?.imagen) {
      const tempFile: UploadedFile = req.files.imagen as UploadedFile
      const result = await uploadImage(tempFile.tempFilePath)
      imagen = { url: result.url, publicId: result.public_id }
      await fs.remove(tempFile.tempFilePath)
    }
    const newTask = new TaskModel({ task, comentario, imagen })
    await newTask.save()
    return res.status(201).json(newTask)
  } catch (error) {
    return res.status(500).json({
      message: "Error al guardar la tarea",
      error,
    })
  }
}
const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { task, comentario, publicId } = req.body
    let imagen

    if (req.files?.imagen) {
      const tempFile: UploadedFile = req.files.imagen as UploadedFile
      const result = await uploadImage(tempFile.tempFilePath)
      imagen = { url: result.url, publicId: result.public_id }
      await fs.remove(tempFile.tempFilePath)
      await deleteImage(publicId)
    }
    const taskUpdate = TaskModel.findByIdAndUpdate(
      id,
      { task, comentario, imagen },
      { new: true }
    )
    if (!taskUpdate) {
      return res.status(404).json({ message: "No existe la tarea" })
    }
    return res.json(taskUpdate)
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la tarea",
      error,
    })
  }
}
const deleteTaskId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await TaskModel.findByIdAndDelete(id)
    await deleteImage(task.imagen.publicId)
    if (!task) {
      return res.status(404).json({ message: "No existe la tarea" })
    }
    return res.json(task)
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar la tarea",
      error,
    })
  }
}

export { getTasks, getTaskId, saveTask, updateTask, deleteTaskId }
