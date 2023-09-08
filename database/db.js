const mongoose = require('mongoose');
require("dotenv")

const conectDb = async() => {

    
    try {
        const db = await mongoose.connect(process.env.MONGO_DB);
        console.log("database Conectada")
    
    } catch (error) {
        console.log(error)
        throw new Error("data base no conectada")
    }
   
    

}

module.exports = conectDb