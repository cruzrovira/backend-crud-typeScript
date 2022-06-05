import { Schema, model } from "mongoose"
import aggregate from "mongoose-aggregate-paginate-v2"

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    comentario: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      url: String,
      publicId: String,
    },
  },
  {
    timestamps: true,
  }
)

taskSchema.plugin(aggregate)

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const TaskModel = model("task", taskSchema)

export { TaskModel }
