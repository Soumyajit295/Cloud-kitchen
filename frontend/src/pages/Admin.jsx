import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFood } from "../Redux/Slices/adminSlice";

function Admin() {
  const [food, setFood] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const foodImage = e.target.files[0];
    if (!foodImage) {
      toast.error("Failed to upload food image");
    }
    setFood({
      ...food,
      image: foodImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(foodImage);
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", food.name);
    formData.append("description", food.description);
    formData.append("category", food.category);
    formData.append("price", food.price);
    formData.append("image", food.image);
    const res = await dispatch(addFood(formData));
    if (res?.payload?.success) {
      navigate("/admin/foodlist");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">
        Add New Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Image */}
        <div className="flex flex-col items-center mb-4">
          <label
            htmlFor="avatar"
            className="cursor-pointer relative flex items-center justify-center"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-600"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700 border-2 border-gray-600 text-gray-400">
                <span className="text-xl">+</span>
              </div>
            )}
          </label>
        </div>

        {/* Food Name */}
        <div>
          <label className="block mb-2 text-lg font-medium text-slate-700">
            Food Name
          </label>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-lg font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition"
            rows="3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-lg font-medium text-slate-700">
            Category
          </label>
          <select
            name="category"
            value={food.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-lg font-medium text-slate-700">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={food.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
