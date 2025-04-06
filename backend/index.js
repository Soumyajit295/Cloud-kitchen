require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectToDatabase = require('./src/database/connection')
const userRouter = require('./src/routes/userRoutes')


const app = express()

connectToDatabase()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

/* Routes configaration */
app.use('/api/users',userRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})

