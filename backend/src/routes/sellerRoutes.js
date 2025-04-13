const express = require('express')
const { isSeller, isLoggedIn } = require('../middlewares/authMiddlewares')
const { addFood, removeFood, updateFood } = require('../controllers/sellerController')
const upload = require('../middlewares/multerMiddleware')

const sellerRouter = express.Router()

sellerRouter.post('/addfood',isLoggedIn,isSeller('seller'),upload.single('image'),addFood)
sellerRouter.delete('/removefood/:foodid',isLoggedIn,isSeller('seller'),removeFood)
sellerRouter.patch('/updatefood/:foodid',isLoggedIn,isSeller('seller'),upload.single('image'),updateFood)

module.exports = sellerRouter

