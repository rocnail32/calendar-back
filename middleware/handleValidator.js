const { validationResult } = require("express-validator")

const handleValidator = (req,res,next) => {

    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return res.json({
            error: errors.array()
        })
    }

    next()

}

module.exports = handleValidator