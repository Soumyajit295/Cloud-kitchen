const User = require("../models/userModels")

const addressValidation = async (req, res, next) => {
    const { _id } = req.user
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Account not found"
            })
        }

        if (!user.selectedAddress) {
            return res.status(400).json({
                success: false,
                message: "Please set your order address"
            })
        }

        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong during address validation"
        })
    }
}

module.exports = {
    addressValidation
}
