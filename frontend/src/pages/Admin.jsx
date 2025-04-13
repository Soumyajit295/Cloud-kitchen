import React, { useState } from 'react';

function Admin() {
  const [food, setFood] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFood((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted food:", food);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Food Image */}
        <div>
          <label className="block mb-1 font-medium text-slate-700">Food Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Food Name */}
        <div>
          <label className="block mb-1 font-medium text-slate-700">Food Name</label>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-slate-700">Category</label>
          <select
            name="category"
            value={food.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
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

        <div>
          <label className="block mb-1 font-medium text-slate-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={food.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
