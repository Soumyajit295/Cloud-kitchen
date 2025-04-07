const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddlewares')
const { addToCart, removeFromCart, updateCartQuantity, getCartDetails } = require('../controllers/cartController')

const cartRouter = express.Router()

cartRouter.post('/addtocart',isLoggedIn,addToCart)
cartRouter.post('/removefromcart/:foodid',isLoggedIn,removeFromCart)
cartRouter.patch('/incrementquantity/:foodid',isLoggedIn,updateCartQuantity)
cartRouter.get('/getcart',isLoggedIn,getCartDetails)

module.exports = cartRouter