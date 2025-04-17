import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Redux/Slices/userauthSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders = [] } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="space-y-10 relative">
          {[...orders].reverse().map(
            (
              order,
              index
            ) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow-md border relative"
              >
                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-medium">Items:</span>{" "}
                  {order.orderItems
                    .map(
                      (item) =>
                        `${item?.food?.name || "Item"} x${item.quantity}`
                    )
                    .join(" | ")}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Total:</span> ₹
                  {order.totalAmount}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Status:</span>{" "}
                  {order.orderStatus}
                </p>

                <div className="mt-4 text-right text-sm text-gray-500">
                  Ordered On: {new Date(order.createdAt).toLocaleString()}
                </div>

                {/* Vertical stick line */}
                {index !== orders.length - 1 && (
                  <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-10 border-l-2 border-gray-300 h-8"></div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
