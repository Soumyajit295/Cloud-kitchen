const User = require("../models/userModels");

const addToCart = async(req,res)=>{
    const {ingridiants} = req.body
    const {_id} = req.user
    if(!ingridiants || ingridiants.length === 0){
        return res.status(400).json({
            success : false,
            message : "At least one item is needed"
        })
    }
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Account not found"
            })
        }
        ingridiants.forEach((foodItem)=>{
            const existingItem = user.cartItems.find((item)=>item.food.toString() == foodItem.food)
            if(existingItem){
                existingItem.quantity+= foodItem.quantity || 1
            }
            else{
                user.cartItems.push({
                    food : foodItem.food,
                    quantity : foodItem.quantity || 1
                })
            }
        }) 
        await user.save()
        return res.status(200).json({
            success : true,
            message : "Item added successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : `Something went wrong while add to cart ${err.message}`
        })
    }
}

const removeFromCart = async(req,res)=>{
    const {foodid} = req.params
    const {_id} = req.user
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Account not found"
            })
        }
        user.cartItems = user.cartItems.filter((item)=>item.food.toString()!==foodid)
        await user.save()
        return res.status(200).json({
            success : true,
            message : "item removed from cart",
            data : user.cartItems
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while removing item"
        })
    }
}

const updateCartQuantity = async(req,res)=>{
    const {_id} = req.user
    const {foodid} = req.params
    const {quantity} = req.body
    try{
        const parsedQuantity = Number(quantity)
        console.log("Parsed quantity : ",parsedQuantity)
        if(isNaN(parsedQuantity) || parsedQuantity <= 0){
            return res.status(400).json({
                success : false,
                message : "Enter a valid quantity"
            })
        }
        
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Acoount not found"
            })
        }
        let itemFound = false
        let quantityExeceed = false
        user.cartItems.forEach((item)=>{
            if(item.food.toString() === foodid){
                if(parsedQuantity > 10){
                    item.quantity = 10
                    itemFound = true
                    quantityExeceed = true
                }
                else{
                    item.quantity = parsedQuantity
                    itemFound = true
                }
            }
        })
        if(!itemFound){
            return res.status(400).json({
                success : false,
                message : "Food not found"
            })
        }
        await user.save()
        return res.status(200).json({
            success: true,
            message: quantityExeceed 
                ? "Quantity exceeded maximum limit. Set to 10." 
                : "Item quantity changed successfully",
            data: user.cartItems
        })        
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while adding item"
        })
    }
}

const getCartDetails = async(req,res)=>{
    const {_id} = req.user
    try{
        const user = await User.findById(_id).populate('cartItems.food')
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Failed to get cart details"
            })
        }
        let totalCartValue = 0
        user.cartItems.forEach((item)=>{
            totalCartValue+=item.food.price * item.quantity
        })
        return res.status(200).json({
            success : true,
            message : "Cart details fetched successfully",
            data : user.cartItems,
            totalCartValue
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : `Something went wrong while fetching cart details ${err.message}`
        })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartDetails
}