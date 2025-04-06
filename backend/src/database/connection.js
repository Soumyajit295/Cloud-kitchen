const mongoose = require('mongoose')

const connectToDatabase = async()=>{
    mongoose.connect(process.env.mongo_url)
    .then(()=>console.log(`Database connection successfull`))
    .catch((err)=>console.log(`Database connection failed ${err.message}`))
}

module.exports = connectToDatabase