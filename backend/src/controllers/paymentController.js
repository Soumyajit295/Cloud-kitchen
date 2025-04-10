const razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/userModels");
const Order = require("../models/ordersModels");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate("cartItems.food");
    if (!user || user.cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    let calculatedTotal = 0;
    for (let item of user.cartItems) {
      calculatedTotal += item.food.price * item.quantity;
    }
    const option = {
      amount: calculatedTotal * 100,
      currency: "INR",
      receipt: `recipt_order_${Date.now()}`,
    };
    const neworder = await instance.orders.create(option);
    if (!neworder) {
      return res.status(400).json({
        success: false,
        message: "Failed to forward payment",
      });
    }
    return res.status(200).json({
      success: true,
      data: neworder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Something went while forwaring the payment ${err.message}`,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const { _id } = req.user;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing payment verification data",
    });
  }

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const user = await User.findById(_id).populate("cartItems.food");
    if (!user || user.cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let calculatedTotal = 0;
    for (let item of user.cartItems) {
      calculatedTotal += item.food.price * item.quantity;
    }

    const newOrder = await Order.create({
      user: user._id,
      orderItems: user.cartItems,
      totalAmount: calculatedTotal,
      paymentMode: "Online",
      razorpay_payment_id,
      razorpay_order_id,
    });

    user.orders.push(newOrder._id);
    user.cartItems = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Order successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Something went wrong during payment verification: ${err.message}`,
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};
