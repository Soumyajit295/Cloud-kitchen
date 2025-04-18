import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Redux/Slices/userauthSlice";
import { cancelOrder } from "../Redux/Slices/orderSlice";
import CancelModel from "../components/CancelModel";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders = [] } = useSelector((state) => state.user);
  const [orderToBeCanceled,setOrderToBeCanceled] = useState(null);
  const [cancelModel,setCancelModel] = useState(false);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const cancelOrderHandler = (orderid)=>{
    setOrderToBeCanceled(orderid)
    setCancelModel(true)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-10 relative">
          {[...orders].reverse().map((order, index) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-2xl shadow-lg border relative"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Status:</span>{"   "}
                    <span
                      className={`ml-2 px-2 py-1 rounded text-white ${
                        order.orderStatus === "Cancelled"
                          ? "bg-red-500"
                          : order.orderStatus === "Delivered"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Ordered On:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {["Pending", "Accepted"].includes(order.orderStatus) && (
                  <button
                    onClick={()=>cancelOrderHandler(order._id)}
                    className="cursor-pointer mt-3 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-md transition-all"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Items:</span>{" "}
                  {order.orderItems
                    .map(
                      (item) =>
                        `${item?.food?.name || "Item"} x${item.quantity}`
                    )
                    .join(" | ")}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Total:</span> ₹{order.totalAmount}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Payment Mode:</span>{" "}
                  {order.paymentMode}
                </p>

                {order.paymentMode === "Online" && (
                  <div className="text-xs mt-2 text-gray-600 bg-gray-100 p-3 rounded-lg space-y-1">
                    <p>
                      <span className="font-medium">Razorpay Order ID:</span>{" "}
                      {order.razorpay_order_id}
                    </p>
                    <p>
                      <span className="font-medium">Razorpay Payment ID:</span>{" "}
                      {order.razorpay_payment_id}
                    </p>
                  </div>
                )}
              </div>

              {index !== orders.length - 1 && (
                <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-10 border-l-2 border-gray-300 h-8"></div>
              )}
            </div>
          ))}
        </div>
      )}
      {
        cancelModel && <CancelModel orderid={orderToBeCanceled} onClose={()=>setCancelModel(false)}/>
      }
    </div>
  );
};

export default Orders;
