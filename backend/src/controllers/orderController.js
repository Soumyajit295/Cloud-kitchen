const Order = require("../models/ordersModels");
const Food = require("../models/productModels");
const User = require("../models/userModels");


const createOrder = async(req,res)=>{
    const {_id} = req.user
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Account not found"
            })
        }
        if(!user.cartItems || user.cartItems.length === 0){
            return res.status(400).json({
                success : false,
                message : "Cart is empty"
            })
        }
        let calculatedTotal = 0
        for (const item of user.cartItems) {
            const food = await Food.findById(item.food);
            if (!food) {
              return res.status(400).json({
                success: false,
                message: "Food not found",
              });
            }
            if(item.quantity <= 0){
                return res.status(400).json({
                    success : false,
                    message : `Invalid quantity for ${food.name}`
                })
            }
            calculatedTotal += food.price * item.quantity;
          }
        const order = await Order.create({
            user : user._id,
            orderItems : user.cartItems,
            totalAmount : calculatedTotal,
            paymentMode : "COD"
        })
        if(!order){
            return res.status(400).json({
                success : false,
                message : "Failed to create the order"
            })
        }
        user.orders.push(order._id)
        user.cartItems.splice(0)
        await user.save()
        return res.status(200).json({
            success : true,
            message : "Order successfull"
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong during order creation",
        });
    }
}

const cancelOrder = async (req, res) => {
  const { orderid } = req.params;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }

    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }

    if (["Cooking", "On The Way", "Delivered"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel the order as it is already ${order.orderStatus.toLowerCase()}`,
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order has been cancelled successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while cancelling the order",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderid } = req.params;
  const { orderStatus } = req.body;

  if (!orderStatus) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid order status",
    });
  }

  try {
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(400).json({
        success: false,
        messaga: "Order not found",
      });
    }
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is canceled it cannot be modified",
      });
    }
    order.orderStatus = orderStatus;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during updating order status",
    });
  }
};

const getAllOrders = async (req, res) => {
  try{
    const orders = await Order.find()
                  .populate({
                    path : 'user',
                    select : 'name contactNumber selectedAddress',
                    populate : {
                        path : 'selectedAddress'
                    }
                  })
                  .populate({
                    path : 'orderItems.food',
                    select : 'name'
                  })
    if(!orders){
        return res.status(400).json({
            success : false,
            message : "Failed to get the order details"
        })
    }
    return res.status(200).json({
        success : true,
        message : "Order details fetched successfully",
        data : orders
    })
  }
  catch(err){
    return res.status(500).json({
        success : false,
        message : "Something went wrong during fetching order details"
    })
  }
};

module.exports = {
  createOrder,
  cancelOrder,
  updateOrderStatus,
  getAllOrders
};
