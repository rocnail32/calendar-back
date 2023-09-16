const jwt = require("jsonwebtoken")


const jsonToken = async(req,res,next) => {

    try {
        const token = req.header("x-token")

        if(!token) return res.status(401).json("token invalido")

        jwt.verify(token,process.env.SECRET,(error,decoded) => {
            if(error){
                return res.status(403).json({mgs: "error token"})
            }else{
                console.log(decoded)
               req.user = {
                    uid:decoded.uid,
                    name: decoded.name
                }

                next()
            }

        })


    } catch (error) {
        console.log(error)
    }
}

module.exports = jsonToken