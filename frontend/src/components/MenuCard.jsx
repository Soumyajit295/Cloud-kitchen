import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {useSelector} from 'react-redux'

const MenuCard = ({ food , onQuantityChange}) => {
  const [count, setCount] = useState(0);
  const {user} = useSelector((state)=>state.user)

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-72 transition hover:scale-105">
      <img
        src={food.image}
        alt={food.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{food.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-orange-600">₹{food.price}</span>
          {
            user.role!=='seller' &&
            (count === 0 ? (
              <button
                onClick={increment}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition"
              >
                <FaPlus size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-orange-100 px-2 py-1 rounded-full">
                <button
                  onClick={decrement}
                  className="text-orange-600 hover:text-orange-800 transition"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-sm font-medium text-gray-800">{count}</span>
                <button
                  onClick={increment}
                  className="text-orange-600 hover:text-orange-800 transition"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
