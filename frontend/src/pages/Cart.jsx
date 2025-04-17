import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails, removeFromCart } from "../Redux/Slices/cartSlice";
import AddressCard from "../components/AddressCard";
import PaymentCard from "../components/PaymentCard";
import { FaTrashAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import QuantityModel from "../components/QuantityModel";
import { fetchMyAddress } from "../Redux/Slices/addressSlice";

function Cart() {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user)
  console.log("User : ",user)
  const { cartItem, totalBill } = useSelector((state) => state.cart);
  const [updateQuantityModel, setUpdateQuantityModel] = useState(false);
  const [currentFood, setCurrentFood] = useState('');
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState('')

  useEffect(() => {
    dispatch(getCartDetails());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchMyAddress());
  },[dispatch])

  const handleOpenModal = (item) => {
    setCurrentFood(item.food._id);
    setCurrentFoodQuantity(item.quantity);
    setUpdateQuantityModel(true);
  };

  const onRemove = (foodid)=>{
    dispatch(removeFromCart(foodid))
  }

  return (
    <div className="mt-24 px-4 pb-16 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
          {cartItem.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              {/* Table layout for larger screens */}
              <table className="w-full text-left text-sm hidden lg:table">
                <thead className="border-b text-gray-600">
                  <tr>
                    <th className="py-2">Food</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Total Price</th>
                    <th className="py-2 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item) => (
                    <tr key={item.food._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{item.food.name}</td>
                      <td className="py-3">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="px-3 py-1 border rounded bg-blue-100 hover:bg-blue-200 flex items-center gap-1"
                        >
                          Qty: {item.quantity}
                          <FiChevronDown className="text-sm" />
                        </button>
                      </td>
                      <td className="py-3">₹ {item.food.price * item.quantity}</td>
                      <td className="py-3 text-center">
                        <button 
                        onClick={()=>onRemove(item.food._id)}
                        className="text-red-600 hover:text-red-800">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Vertical stack layout for small screens */}
              <div className="lg:hidden">
                {cartItem.map((item) => (
                  <div key={item.food._id} className="border-b p-4 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="font-semibold">{item.food.name}</p>
                      <p>₹ {item.food.price * item.quantity}</p>
                    </div>
                    <div className="flex gap-5">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-3 py-1 border rounded bg-blue-100 hover:bg-blue-200 flex items-center gap-1"
                      >
                        Qty: {item.quantity}
                        <FiChevronDown className="text-sm" />
                      </button>
                      <button 
                      onClick={()=>onRemove(item.food._id)}
                      className="text-red-600 hover:text-red-800">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {updateQuantityModel && (
          <QuantityModel
            foodid={currentFood}
            quantity={currentFoodQuantity}
            onClose={() => setUpdateQuantityModel(false)}
          />
        )}

        {/* Address and Payment Cards */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <AddressCard />
          <PaymentCard />
        </div>
      </div>
    </div>
  );
}

export default Cart;
