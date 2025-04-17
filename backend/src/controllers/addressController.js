const Address = require("../models/addressModels")
const User = require("../models/userModels")

const addAddress = async (req, res) => {
    const { locality, city, zipcode, state, landmark } = req.body
    const { _id } = req.user

    console.log("Locality : ",locality)
    console.log("City : ",city)
    console.log("Zipcode : ",zipcode)
    console.log("State : ",state)
    console.log("Landmark : ",landmark)

    if (!locality || !city || !zipcode || !state || !landmark) {
        return res.status(400).json({
            success: false,
            message: "Fill all details of address"
        })
    }

    try {
        const newAddress = await Address.create({
            locality, city, zipcode, state, landmark
        })

        if (!newAddress) {
            return res.status(400).json({
                success: false,
                message: "Failed to add new address"
            })
        }

        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).json({ success: false, message: "Account not found" })
        }

        user.address.push(newAddress._id);
        if (!user.selectedAddress) {
            user.selectedAddress = newAddress._id
        }

        await user.save()

        const updatedUser = await User.findById(_id)
            .populate("address")
            .populate("selectedAddress")

        return res.status(200).json({
            success: true,
            message: "New address added successfully",
            addresses: updatedUser.address,
            selectedAddress: updatedUser.selectedAddress
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding new address"
        })
    }
}

const removeAddress = async (req, res) => {
    const { _id } = req.user
    const { addressid } = req.params

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Account not found"
            })
        }

        await Address.findByIdAndDelete(addressid)

        user.address = user.address.filter(
            (add) => add.toString() !== addressid
        )

        if (user.address.length === 0 || user.selectedAddress?.toString() === addressid) {
            user.selectedAddress = user.address[0] || null
        }

        await user.save()

        const updatedUser = await User.findById(_id)
            .populate("address")
            .populate("selectedAddress")

        return res.status(200).json({
            success: true,
            message: "Address removed successfully",
            addresses: updatedUser.address,
            selectedAddress: updatedUser.selectedAddress
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while removing address"
        })
    }
}

const setSelectedAddress = async(req,res)=>{
    const {_id} = req.user
    const {addressid} = req.params
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Account not found"
            })
        }
        const validAddress = user.address.find((add)=>add.toString() === addressid)
        if(!validAddress){
            return res.status(400).json({
                success : false,
                message : "Invalid address"
            })
        }
        user.selectedAddress = addressid
        await user.save()
        const updatedUser = await User.findById(_id).populate("address").populate("selectedAddress")
        return res.status(200).json({
            success : true,
            message : "Order address selected successfully",
            address : updatedUser.address,
            selectedAddress : updatedUser.selectedAddress
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "something went wrong while select new address"
        })
    }
}

module.exports = {
    addAddress,
    removeAddress,
    setSelectedAddress
}