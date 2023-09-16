const express = require("express")
const eventRouter = express.Router()
const {createEvent,deleteEvent,editEvent,getEvents} = require("../controllers/eventController")
const {check} = require("express-validator")
const validateDate = require("../helper/validateDate")
const handleValidator = require("../middleware/handleValidator")


eventRouter.route("/")
.get(getEvents)
.post([
    check("title", "el titulo es requerido").not().isEmpty(),
    check("start", "la fecha no es valida").custom(validateDate),
    check("end", "la fecha no es valida").custom(validateDate),
    
],handleValidator,createEvent)

eventRouter.route("/:id")
.delete(deleteEvent)
.put(editEvent)

module.exports = eventRouter