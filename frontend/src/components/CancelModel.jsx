import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelOrder } from '../Redux/Slices/orderSlice'
import { fetchMyOrders } from '../Redux/Slices/userauthSlice'

function CancelModel({orderid,onClose}) {
  const dispatch = useDispatch()

  const onConfirm = async()=>{
    const res = await dispatch(cancelOrder(orderid))
    if(res?.payload?.success){
        onClose()
        dispatch(fetchMyOrders())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-gray-200 space-y-4">
        <h2 className="text-xl font-semibold text-red-600">
          Are you sure you want to cancel this order?
        </h2>
        <div className="flex space-x-2 pt-4">
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelModel