const express = require("express")
const route = express.Router()
const authRouter = require("./authRouter")
const eventRouter = require("./eventRouter")
const jsonToken = require("../middleware/jsonToken")

route.use("/auth",authRouter)
route.use("/events",jsonToken,eventRouter)

module.exports = route

