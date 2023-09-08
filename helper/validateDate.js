const moment = require("moment")

const validateDate = (value) => {

    const date = moment(value)

    if(!date.isValid()){
        return false
    }else{
        return true
    }

}

module.exports = validateDate