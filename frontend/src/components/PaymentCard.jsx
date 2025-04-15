import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function PaymentCard() {
  const { totalBill } = useSelector((state) => state.cart);
  const [selectedMethod, setSelectedMethod] = useState("COD");

  return (
    <div className="w-full lg:w-[45%] bg-white p-5 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment</h2>

      <div className="mb-3">
        <h3 className="text-sm text-gray-600">Total Cart Value:</h3>
        <p className="text-lg font-bold text-green-700">₹ {totalBill}</p>
      </div>

      <div className="mb-5">
        <h3 className="text-sm text-gray-600 mb-1">Select Payment Method:</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedMethod("COD")}
            className={`cursor-pointer text-sm py-2 px-4 rounded-lg transition ${
              selectedMethod === "COD"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            COD
          </button>
          <button
            onClick={() => setSelectedMethod("Online")}
            className={`cursor-pointer text-sm py-2 px-4 rounded-lg transition ${
              selectedMethod === "Online"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            Online
          </button>
        </div>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-full transition">
        Proceed to Pay
      </button>
    </div>
  );
}

export default PaymentCard;
