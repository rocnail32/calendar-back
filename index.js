const express = require("express")
const conectDb = require("./database/db")
const app = express()
const cors = require("cors")
require("dotenv").config()

app.use(express.static("public"))
app.use(express.json())
app.use(cors())

conectDb()

const PORT = process.env.PORT || 4000
app.use("/app/v1", require("./routes"))
app.get("/", (req,res) => {
    res.send("hola")
})






app.listen(4000)