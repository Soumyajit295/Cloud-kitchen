import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../Redux/Slices/userauthSlice';
import { onSwitchToSignin, setShowSignup } from '../Redux/Slices/authSlice';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setShowSignup(false));
  };

  const toggleToSignin = () => {
    dispatch(onSwitchToSignin());
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const data = { name, email, password, contactNumber };
    const res = await dispatch(signup(data));
    if (res?.payload?.success) {
      dispatch(onSwitchToSignin());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-lg animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-lg font-bold text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
        <h1 className="text-center text-2xl font-semibold mb-5">Create New Account</h1>
        <form onSubmit={onSignup} className="space-y-5">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Contact No</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={toggleToSignin} className="text-orange-600 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
