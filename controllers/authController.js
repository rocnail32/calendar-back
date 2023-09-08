const {validationResult} = require("express-validator")
const User = require("../model/User")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")


const createUser = async(req,res) => {

 try {

    const {email,password} = req.body

    const isEmail = await User.findOne({email})
    if(isEmail){
        return res.status(400).json({error: "hay un correo ya existente"})
    }
   
    const newPassword = await bcrypt.hash(password,10)
    req.body.password = newPassword


    const newUser = new User(req.body)
    await newUser.save()
    if(!newUser){
        return res.status(400).json({error:"hubo un error"})
    }

    const payload  = {
        uid: newUser.id
    }

    const token = jwt.sign(payload,process.env.SECRET,{
        expiresIn: "2h"
    })


    res.status(200).json({
        token
     })


 } catch (error) {
    console.log(error)
    res.status(400).json({
        error
    })
 }

 



}

const logginUser = async(req,res) => {

    try {
        
        const  {email,password} = req.body

    const user = await User.findOne({email})
    if(!user) return res.status(404).json({mgs:"correo no encontrado"})

    const isPassword = await  bcrypt.compare(password,user.password)
    if(!isPassword) return res.status(403).json({mgs: "contraseña incorrecta"})

    const payload = {
        uid: user.id
    }

    const token = jwt.sign(payload,process.env.SECRET,{
        expiresIn: "2h"
    })
    
    res.json({
    user,
     token
    })

    } catch (error) {
       
        console.log(error)
    }
 
}







const renewToken = (req, res) => {

    const id = req.token


    const payload = {
        uid: id
    }

    const token = jwt.sign(payload,process.env.SECRET,{
        expiresIn: "2h"
    })

    res.json({
        token
    })
}

module.exports = {
    createUser,
    logginUser,
    renewToken
}