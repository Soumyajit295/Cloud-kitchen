import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editFood } from "../Redux/Slices/adminSlice";

function EditingModel({ food, onClose }) {
  const [editedFood, setEditedFood] = useState({
    name: food.name || "",
    price: food.price || "",
    image: null,
  });

  const dispatch = useDispatch();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setEditedFood((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    setEditedFood((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      editFood({ foodId: food._id, updatedData: editedFood })
    );
    if (res?.payload?.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('/bg-pattern.png')] bg-cover bg-center bg-orange-100/20 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-orange-200 backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Edit Food Item
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            name="name"
            value={editedFood.name}
            onChange={onChangeValue}
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-orange-50 placeholder-orange-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-slate-700 mb-1">
            Price
          </label>
          <input
            name="price"
            value={editedFood.price}
            onChange={onChangeValue}
            type="number"
            required
            className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-orange-50 placeholder-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="w-full text-sm text-orange-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-orange-200 file:text-slate-800 hover:file:bg-orange-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditingModel;
