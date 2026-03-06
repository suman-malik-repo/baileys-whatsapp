const express = require("express")

const { startWhatsApp } = require("./config/socket")
const messageRoutes = require("./routes/messageRoutes")

const app = express()

app.use(express.json())

app.use("/api", messageRoutes)

const PORT = process.env.PORT || 3000

async function startServer() {

 await startWhatsApp()

 app.listen(PORT, () => {
  console.log("Server running on port", PORT)
 })

}

startServer()