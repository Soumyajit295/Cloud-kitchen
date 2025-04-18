import React, { useEffect, forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchMenu } from "../Redux/Slices/foodSlice";
import MenuCard from "../components/MenuCard";
import { addToCart } from "../Redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Menu = forwardRef((props, ref) => {
  const { menuFoods, menuLoading } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleCart = async () => {
    console.log("Clicked");
    const res = await dispatch(addToCart({ ingridiants: cart }));
    if (res?.payload?.success) {
      setCart([]);
      navigate('/cart')
    }
  };

  const updateCart = (foodId, quantity) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.food === foodId);
      if (quantity === 0) {
        return prevCart.filter((item) => item.food !== foodId);
      }
      if (exists) {
        return prevCart.map((item) =>
          item.food === foodId ? { ...item, quantity } : item
        );
      }
      return [...prevCart, { food: foodId, quantity }];
    });
  };

  return (
    <div ref={ref} className="mt-20 px-10 pb-24 relative">
      <h2 className="text-3xl font-bold mb-5 text-center">
        Our {props.category || "Menu"}
      </h2>

      {menuLoading ? (
        <Loader />
      ) : menuFoods.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-10">
          Sorry, no foods available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuFoods.map((food) => (
            <MenuCard
              key={food._id}
              food={food}
              onQuantityChange={(quantity) => updateCart(food._id, quantity)}
            />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={handleCart}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg text-center font-semibold text-lg transition cursor-pointer hover:bg-orange-600"
        >
          Add to Cart ({cart.length} food added)
        </button>
      )}
    </div>
  );
});

export default Menu;
