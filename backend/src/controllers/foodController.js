const Food = require("../models/productModels")

const getAllfoods = async(req,res)=>{
    try{
        const foodList = await Food.find()
        if(!foodList || foodList.length === 0){
            return res.status(400).json({
                success : false,
                message : "No food listed"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Food list fetched successfully",
            data : foodList
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to get the foodlist"
        })
    }
}

const getSingleFood = async(req,res)=>{
    const {foodid} = req.params
    try{
        const food = await Food.findById(foodid)
        if(!food){
            return res.status(400).json({
                success : false,
                message : "Failed to get food"
            })
        }
        return res.status(200).json({
            success : true,
            data : food
        })
    }   
    catch(err){
        return res.status(500).json({
            status : false,
            message : "Failed to get the food"
        })
    }
}

const getMenu = async(req,res)=>{
    try{
        const menu = await Food.find({instock : true})
        if(!menu || menu.length === 0){
            return res.status(400).json({
                success : false,
                message : "No food available"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Menu fetched successfully",
            data : menu
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to get menu"
        })
    }
}

const getMenuByCategory = async(req,res)=>{
    const {category} = req.body
    if(!category){
        return res.status(400).json({
            success : false,
            message : "Category is required"
        })
    }
    try{
        const menu = await Food.find({category : category})
        if(!menu || menu.length === 0){
            return res.status(200).json({
                success : true,
                message : "No food available",
                data : []
            })
        }
        return res.status(200).json({
            success : true,
            message : `${category}'s fetched successfully`,
            data : menu
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to fetch menu"
        })
    }
}

module.exports = {
    getAllfoods,
    getMenu,
    getMenuByCategory,
    getSingleFood
}