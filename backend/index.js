require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectToDatabase = require('./src/database/connection')
const userRouter = require('./src/routes/userRoutes')
const sellerRouter = require('./src/routes/sellerRoutes')
const cartRouter = require('./src/routes/cartRoutes')
const addressRouter = require('./src/routes/addressRoutes')
const orderRouter = require('./src/routes/orderRoutes')
const paymentRouter = require('./src/routes/paymentRoutes')


const app = express()

connectToDatabase()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

/* Routes configaration */
app.use('/api/users',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)
app.use('/api/payment',paymentRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})

