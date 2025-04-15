import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../Redux/Slices/userauthSlice';

function AddressFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    locality: '',
    landmark: '',
    city: '',
    zipcode: '',
    state: '',
  });
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async() => {
    const res = await dispatch(addAddress(formData))
    if(res?.payload?.success){
        onClose()
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Address</h2>

        <div 
        className="space-y-4">
          <input
            type="text"
            name="locality"
            placeholder="Locality"
            value={formData.locality}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-full text-sm bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-4 py-2 rounded-full text-sm bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressFormModal;
