import mongoose from "mongoose"

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_DEV

mongoose
  .connect(connectionString || "")
  .then(data => {
    const name = data.connections[0].name
    console.log(`Connected  MongoDB data base : ${name}`)
  })
  .catch(error => {
    console.log(error)
  })

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    )
    process.exit(0)
  })
})
