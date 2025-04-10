const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    razorpay_payment_id : {type : String},
    razorpay_order_id : {type : String},
    orderStatus: {
        type: String,
        enum: ['Pending', 'Accepted', 'Cooking', 'On The Way', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
