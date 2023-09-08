const express = require("express")
const { createUser,logginUser,renewToken } = require("../controllers/authController")
const authRouter = express.Router()
const {check} = require("express-validator")
const handleValidator = require("../middleware/handleValidator")
const jsonToken = require("../middleware/jsonToken")


authRouter.route("/create")
.post([
    check("name","el nombre es requerido").not().isEmpty(),
    check("email", "debe ser un email valido").isEmail(),
    check("password","la contraseña debe tener minimo 5 caracteres").isLength({
       min: 5 
    }),
    handleValidator
],createUser)

authRouter.route("/")
.post([
    check("email", "debe ser un email valido").isEmail(),
    check("password","la contraseña debe tener minimo 5 caracteres").isLength({
       min: 5 
    }),
    handleValidator
],logginUser)

authRouter.route("/renew")
.get(jsonToken,renewToken)



module.exports = authRouter