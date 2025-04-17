import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCODorder, createOnlineOrder, getKey, verifyPayment } from '../Redux/Slices/orderSlice';
import toast from 'react-hot-toast';

function PaymentCard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { totalBill } = useSelector((state) => state.cart);
  const {loading } = useSelector((state) => state.order);

  const [redirecting, setRedirecting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("COD");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPayment = async () => {
    if (selectedMethod === "COD") {
      const res = await dispatch(createCODorder());
      if (res?.payload?.success) {
        navigate('/myorder');
      }
    }

    if (selectedMethod === "Online") {
      try {
        setRedirecting(true);
        const orderRes = await dispatch(createOnlineOrder());
        if (orderRes?.payload?.data?.id) {
          const keyResponse = await dispatch(getKey());
          const keyData = keyResponse?.payload?.data
          const options = {
            key: keyData,
            amount: orderRes.payload.data.amount,
            currency: "INR",
            name: "Food App",
            description: "Order Payment",
            order_id: orderRes.payload.data.id,
            handler: async (response) => {
              const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              const verifyRes = await dispatch(verifyPayment({ paymentData }));
              if (verifyRes?.payload?.success) {
                toast.success("Payment successful!");
                navigate('/myorder');
              } else {
                toast.error("Payment verification failed!");
              }
            },
            prefill: {
              name: user?.name,
              email: user?.email,
              contact: user?.phone || "",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const razor = new window.Razorpay(options);
          razor.open();
        }
      } catch (err) {
        toast.error("Something went wrong with the payment.");
        console.error(err);
      } finally {
        setRedirecting(false);
      }
    }
  };

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

      <button 
        onClick={onPayment}
        disabled={loading || redirecting}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-full transition"
      >
        {redirecting ? 'Redirecting...' : 'Proceed to Pay'}
      </button>

      {redirecting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="text-white text-center p-5">
            <div className="text-xl mb-2">Redirecting to payment...</div>
            <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
