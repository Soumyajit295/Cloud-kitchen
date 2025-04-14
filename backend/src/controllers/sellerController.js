const Food = require("../models/productModels")
const { uploadOncloudinary } = require("../utils/uploadToCloudinary")

const addFood = async (req, res) => {
    const { name, description, price, category } = req.body
    
    if (!name || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const newItem = await Food.create({
            name,
            description: description || '',
            price,
            category
        })

        if (!newItem) {
            return res.status(400).json({
                success: false,
                message: "Failed to create the food"
            })
        }

        if (req.file) {
            const localImagePath = req.file.path
            const uploadedImage = await uploadOncloudinary(localImagePath)
        
            if (uploadedImage) {
                newItem.image = uploadedImage
                await newItem.save()
            }
        }
        
        return res.status(200).json({
            success: true,
            message: "Food listed successfully",
            data: newItem
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while listing food: ${err.message}`
        })
    }
}

const removeFood = async(req,res)=>{
    try{
        const {foodid} = req.params
        const food = await Food.findOneAndDelete(foodid)
        if(!food){
            return res.status(400).json({
                success : false,
                message : "Failed to remove food"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Food removed successfully",
            data : foodid
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : `Something went wrong while deleting food ${err.message}`
        })
    }
}

const updateFood = async (req, res) => {
    const { price, instock, name } = req.body
    const { foodid } = req.params

    console.log("Name:", name)
    console.log("Price (raw):", price)
    console.log("Instock (raw):", instock)

    if (
        price === undefined &&
        instock === undefined &&
        name === undefined &&
        !req.file
    ) {
        return res.status(400).json({
            success: false,
            message: "At least one field is needed"
        });
    }

    try {
        const newFood = {}
        if (req.file) {
            const localFilePath = req.file.path
            const cloudinaryResponse = await uploadOncloudinary(localFilePath)
            if (cloudinaryResponse) {
                newFood.image = cloudinaryResponse;
            }
        }

        if (price !== undefined) {
            const parsedPrice = Number(price)
            if (isNaN(parsedPrice)) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be a valid number"
                })
            }
            newFood.price = parsedPrice
        }

        if (instock !== undefined) {
            if (instock === "true" || instock === true) {
                newFood.instock = true
            } else if (instock === "false" || instock === false) {
                newFood.instock = false
            } else {
                return res.status(400).json({
                    success: false,
                    message: "instock must be true or false"
                });
            }
        }

        if (name !== undefined) newFood.name = name

        const updatedFood = await Food.findByIdAndUpdate(foodid, newFood, { new: true })

        if (!updatedFood) {
            return res.status(400).json({
                success: false,
                message: "Failed to update food details"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food details updated successfully",
            data: updatedFood
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while updating food: ${err.message}`
        });
    }
};



module.exports = {
    addFood,
    removeFood,
    updateFood
}
