import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddressListModel from './AddressListModel';
import AddressFormModal from './AddressForm';

function AddressCard() {
  const {selectedAddress} = useSelector((state)=>state.address)
  const user = JSON.parse(localStorage.getItem('user'))
  const [showAddressList,setShowAddressList] = useState(false);
  const [showNewAddressForm,setShowAddressForm] = useState(false);

  console.log("SelectedAddress : ",user.selectedAddress)

  return (
    <div className="w-full lg:w-[45%] bg-white p-5 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Delivery Address</h2>

      {selectedAddress ? (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {`${selectedAddress.locality}, ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.zipcode}, ${selectedAddress.state}`}
        </p>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No address selected yet.</p>
      )}

      <button 
      onClick={()=>setShowAddressForm(true)}
      className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-4 rounded-full">
      Add Address
      </button>
      <button 
      onClick={()=>setShowAddressList(true)}
      className="cursor-pointer ml-5 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-4 rounded-full">
      Change Address
      </button>
      {showAddressList && <AddressListModel onClose={()=>setShowAddressList(false)}/>}
      {showNewAddressForm && <AddressFormModal onClose={()=>setShowAddressForm(false)}/>}
    </div>
  );
}

export default AddressCard;
