import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodList,
  changeFoodStock,
} from "../Redux/Slices/adminSlice";
import EditingModel from "../components/EditingModel";
import DeletModel from "../components/DeletModel";
import Loader from "../components/Loader";

const Foodlist = () => {
  const dispatch = useDispatch();
  const { foods = [], loading } = useSelector((state) => state.admin); // ✅ Default empty array

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deletedFoodId, setDeletedFoodId] = useState(null);
  const [currentFood, setCurrentFood] = useState(null);

  useEffect(() => {
    dispatch(fetchFoodList());
  }, [dispatch]);

  const onToggleStock = (foodId, currentStock) => {
    dispatch(changeFoodStock({ foodId, stockStatus: !currentStock }));
  };

  const handleEditSubmit = (food) => {
    setIsEdit(true);
    setCurrentFood(food);
  };

  const onCloseEditormodel = () => {
    setIsEdit(false);
  };

  const onClickDelete = (food) => {
    setIsDelete(true);
    setDeletedFoodId(food._id);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`overflow-x-auto rounded-xl shadow-md ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <table className="min-w-full divide-y divide-orange-300 bg-white text-gray-800">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">In Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {Array.isArray(foods) && foods.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No food items found.
                  </td>
                </tr>
              ) : (
                foods.map((food, index) => (
                  <tr key={food._id || index} className="hover:bg-orange-50 transition">
                    <td className="px-4 py-3">
                      <img
                        src={food?.image}
                        alt={food?.name}
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3">{food.name}</td>
                    <td className="px-4 py-3">{food.category}</td>
                    <td className="px-4 py-3">₹{food.price}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onToggleStock(food._id, food.instock)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                          food.instock
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {food.instock ? "In Stock" : "Out of Stock"}
                      </button>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="text-orange-500 hover:text-orange-700 transition"
                        onClick={() => handleEditSubmit(food)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onClickDelete(food)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {isEdit && <EditingModel food={currentFood} onClose={onCloseEditormodel} />}
      {isDelete && <DeletModel onClose={() => setIsDelete(false)} foodid={deletedFoodId} />}
    </>
  );
};

export default Foodlist;
