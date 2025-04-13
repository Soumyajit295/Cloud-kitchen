const express = require('express')
const { isLoggedIn, isSeller } = require('../middlewares/authMiddlewares')
const { getAllfoods, getMenu, getMenuByCategory } = require('../controllers/foodController')

const foodRouter = express.Router()

foodRouter.get('/allfoods',isLoggedIn,isSeller('seller'),getAllfoods)
foodRouter.get('/menu',getMenu)
foodRouter.get('/desiredmenu',getMenuByCategory)

module.exports = foodRouter