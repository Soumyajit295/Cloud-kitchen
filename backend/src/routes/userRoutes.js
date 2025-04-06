const express = require('express')
const { register, login, logout } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.get('/login',login)
userRouter.get('/logout',logout)

module.exports = userRouter