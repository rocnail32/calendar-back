const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

EventSchema.method("toJSON", function(){

    const {_id,__v,...object} = this.toObject()
    object.id = _id
    return object

})



module.exports = mongoose.model("event",EventSchema)