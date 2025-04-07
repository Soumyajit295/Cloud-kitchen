const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUDINARY_APISECRET
})

const uploadOncloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath)
        if(response){
            fs.unlinkSync(localFilePath)
            return response?.secure_url
        }
        else{
            return null
        }
    }
    catch(err){
        console.log("Failed to upload picture")
        return null;
    }
}

module.exports = {
    uploadOncloudinary
}