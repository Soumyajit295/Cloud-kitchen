const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddlewares')
const { createRazorpayOrder, verifyPayment, getKey } = require('../controllers/paymentController')

const paymentRouter = express.Router()

paymentRouter.post('/createrazorpayorder',isLoggedIn,createRazorpayOrder)
paymentRouter.post('/verifypayment',isLoggedIn,verifyPayment)
paymentRouter.get('/getkey',isLoggedIn,getKey)

module.exports = paymentRouter