import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAddress } from '../Redux/Slices/userauthSlice';

function AddressListModel({ onClose }) {
//   const { user } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem('user'))
  
  console.log(user)
  const dispatch = useDispatch()

  const onChangeOrderAddress = async(address)=>{
    const res = await dispatch(setSelectedAddress({addressid : address._id}))
    if(res?.payload?.success){
        onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-orange-100/20 backdrop-blur-sm bg-[url('/bg-pattern.png')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Addresses</h2>

        {user.address.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Sorry, no saved address found.</p>
        ) : (
          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {user.address.map((add, index) => (
              <div
                onClick={()=>onChangeOrderAddress(add)}
                key={index}
                className="cursor-pointer border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-50"
              >
                <p className="text-sm text-gray-700 leading-relaxed">
                  {`${add.locality}, ${add.landmark}, ${add.city}, ${add.zipcode}, ${add.state}`}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
        >
          ✕ Close
        </button>
      </div>
    </div>
  );
}

export default AddressListModel;
