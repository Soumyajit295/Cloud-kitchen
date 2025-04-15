const express = require('express')
const { isLoggedIn, isSeller } = require('../middlewares/authMiddlewares')
const { getAllfoods, getMenu, getMenuByCategory,getSingleFood } = require('../controllers/foodController')

const foodRouter = express.Router()

foodRouter.get('/allfoods',isLoggedIn,isSeller('seller'),getAllfoods)
foodRouter.get('/singleFood/:foodid',isLoggedIn,getSingleFood)
foodRouter.get('/menu',getMenu)
foodRouter.post('/desiredmenu',getMenuByCategory)

module.exports = foodRouter