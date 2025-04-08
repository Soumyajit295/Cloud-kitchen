const express = require('express')
const { addAddress, removeAddress, setSelectedAddress } = require('../controllers/addressController')
const { isLoggedIn } = require('../middlewares/authMiddlewares')

const addressRouter = express.Router()

addressRouter.post('/addaddress',isLoggedIn,addAddress)
addressRouter.post('/removeaddress/:addressid',isLoggedIn,removeAddress)
addressRouter.patch('/setorderaddress/:addressid',isLoggedIn,setSelectedAddress)

module.exports = addressRouter