const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddlewares')
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController')

const paymentRouter = express.Router()

paymentRouter.get('/createrazorpayorder',isLoggedIn,createRazorpayOrder)
paymentRouter.post('/verifypayment',isLoggedIn,verifyPayment)

module.exports = paymentRouter