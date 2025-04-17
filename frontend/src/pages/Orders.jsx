import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../Redux/Slices/orderSlice';

function Orders() {
  const { allOrders, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [showPending, setShowPending] = useState(true); // Toggle state

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const onOrderStatusChange = (orderid, orderStatus) => {
    dispatch(updateOrderStatus({ orderid, orderStatus }));
  };

  const pendingOrders = allOrders?.filter((order) => order.orderStatus !== "Delivered");
  const deliveredOrders = allOrders?.filter((order) => order.orderStatus === "Delivered");

  const renderOrders = (orders) => (
    <div className="space-y-6 mt-6">
      {[...orders].reverse().map((order) => (
        <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border">
          <div className="mb-3 text-sm text-gray-600">
            <p><strong>User:</strong> {order.user?.name || "N/A"}</p>
            <p><strong>Contact:</strong> {order.user?.contactNumber || "N/A"}</p>
            <p><strong>Address:</strong> {`${order.user?.selectedAddress?.locality}, ${order.user?.selectedAddress?.landmark}, ${order.user?.selectedAddress?.city}`}</p>
          </div>

          <div className="mb-3">
            <h3 className="font-semibold mb-2 text-gray-700">Items Ordered:</h3>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {order.orderItems.map((item, idx) => (
                <li key={idx}>
                  {item.food?.name || "Item"} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentMode}</p>
            <div className="flex items-center gap-2">
              <label htmlFor={`status-${order._id}`} className="font-medium">Status:</label>
              <select
                id={`status-${order._id}`}
                value={order.orderStatus}
                onChange={(e) => onOrderStatusChange(order._id, e.target.value)}
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option>Pending</option>
                <option>Accepted</option>
                <option>Cooking</option>
                <option>On The Way</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Manage Orders</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowPending(true)}
          className={`cursor-pointer px-4 py-2 rounded-md font-medium ${
            showPending ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => setShowPending(false)}
          className={`cursor-pointer px-4 py-2 rounded-md font-medium ${
            !showPending ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Delivered Orders
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : showPending ? (
        pendingOrders?.length > 0 ? renderOrders(pendingOrders) : (
          <p className="text-center text-gray-500">No pending orders found.</p>
        )
      ) : (
        deliveredOrders?.length > 0 ? renderOrders(deliveredOrders) : (
          <p className="text-center text-gray-500">No delivered orders yet.</p>
        )
      )}
    </div>
  );
}

export default Orders;
