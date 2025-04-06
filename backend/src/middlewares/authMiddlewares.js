const jwt = require('jsonwebtoken')

const isLoggedIn = async(req,res,next)=>{
    try{
        const authToken = req.cookies.authToken
        if(!authToken){
            return res.status(400).json({
                success : false,
                message : "Failed to authentication"
            })
        }
        const verifyToken = jwt.verify(authToken,process.env.jwt_secret)
        req.user = verifyToken
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : `Failed to authentication ${err.message}`
        })
    }
}

const isSeller = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(400).json({
                success : false,
                message : "Please login"
            })
        }
        const userRole = req.user?.role
        if(!userRole || !roles.includes(userRole)){
            return res.status(400).json({
                success : false,
                message : "User not authorized"
            })
        }
        next()
    }
}

module.exports = {
    isLoggedIn,
    isSeller
}