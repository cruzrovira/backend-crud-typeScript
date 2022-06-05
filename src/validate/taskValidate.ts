import { NextFunction, Request, Response } from "express"
import joi from "joi"

const schema = joi.object({
  task: joi.string().required().messages({
    "any.required": "Task res requerido",
  }),
  comentario: joi
    .string()
    .required()
    .messages({ "any.required": "comentario  res requerido" }),
})

const taskValidatePost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (!error) {
    next()
  } else {
    return res.status(400).json({
      error: error.message,
    })
  }
}

export { taskValidatePost }
