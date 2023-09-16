const Event = require("../model/Event")


const createEvent = async(req,res) => {


    try {
        
        const event = new Event(req.body)
        event.user = req.user.uid
        const eventSaved = await event.save()
        res.status(201).json(eventSaved)

    } catch (error) {
        
        res.status(400).json({error})

    }

    

}

const getEvents = async(req,res) => {

    const id = req.user

    try {
        const events = await Event.find()
                                .populate("user","name")

        res.json(events)                        
    } catch (error) {
        res.status(400).json({error})
    }

}


const editEvent = async(req,res) => {

    const event = req.body
    const eventId = req.params.id
    const {uid} = req.user
    console.log(eventId)
    try {
        
        const oldEvent = await Event.findById(eventId)
                                                .populate("user","name")
        if(!oldEvent) return res.status(404)
        if(oldEvent.user._id != uid) return res.status(403).json({mgs: "no tienes permiso"})
        
        const editEvent = await Event.findByIdAndUpdate(eventId,event,{new:true})
        
        res.json(editEvent)

    } catch (error) {
        res.status(400).json({error})
    }

   
}

const deleteEvent = async(req,res) => {


    const eventId = req.params.id
    const {uid} = req.user
    console.log(eventId)
    try {
        
        const oldEvent = await Event.findById(eventId)
                                                .populate("user","name")
        if(!oldEvent) return res.status(404)
        if(oldEvent.user._id != uid) return res.status(403).json({mgs: "no tienes permiso"})
        
        const deleteEvent = await Event.findByIdAndDelete(eventId)
        
        res.status(200).json(deleteEvent)

    } catch (error) {
        res.status(400).json({error})
    }


}

module.exports = {

    deleteEvent,
    getEvents,
    createEvent,
    editEvent
}