const express = require('express')
const { isLoggedIn, isSeller } = require('../middlewares/authMiddlewares')
const { addressValidation } = require('../middlewares/addressValidationMiddleware')
const { createOrder, cancelOrder, updateOrderStatus, getAllOrders } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createorder',isLoggedIn,addressValidation,createOrder)
orderRouter.patch('/cancelorder/:orderid',isLoggedIn,cancelOrder)

/* For Seller */
orderRouter.patch('/updateorder/:orderid',isLoggedIn,isSeller('seller'),updateOrderStatus)
orderRouter.get('/allorder',isLoggedIn,isSeller('seller'),getAllOrders)

module.exports = orderRouter