const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddlewares')

const authRouter = express.Router()

authRouter.get('/validate',isLoggedIn,(req,res)=>{
    return res.status(200).json({
        success : true,
        user : req.user
    })
})

module.exports = authRouter