import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood } from "../Redux/Slices/adminSlice";
import { updateCartQuantity } from "../Redux/Slices/cartSlice";

function QuantityModel({ foodid, quantity, onClose }) {
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const onUpdate = async()=>{
    const res = await dispatch(updateCartQuantity({foodid,quantity : updatedQuantity}))
    if(res?.payload?.success){
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl border border-gray-200 space-y-6 transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
          Update Food Quantity
        </h2>
        <div className="flex justify-center">
          <input
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
            className="px-4 py-2 w-full rounded-xl border border-slate-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            type="number"
            min="1"
            max="10"
            step="1"
          />
        </div>
        <div className="flex space-x-4 pt-4 justify-center">
          <button
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuantityModel;
