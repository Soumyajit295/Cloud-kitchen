const express = require('express')
const { register, login, logout, getMyOrders, getMyAddressess } = require('../controllers/userControllers')
const { isLoggedIn } = require('../middlewares/authMiddlewares')

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.get('/myorders',isLoggedIn,getMyOrders)
userRouter.get('/address',isLoggedIn,getMyAddressess)

module.exports = userRouter