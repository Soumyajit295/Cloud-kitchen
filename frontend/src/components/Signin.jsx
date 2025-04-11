import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../Redux/Slices/userauthSlice';

function Signin({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSignin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const res = await dispatch(signin(data)); // Don't forget `await`
    if (res?.payload?.success) {
      onClose();
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
        <h1 className="text-center text-2xl font-semibold mb-5">Welcome back</h1>
        <form onSubmit={onSignin} className="space-y-5">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
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
              placeholder="Enter your password"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <button onClick={onSwitchToSignup} className="text-orange-600 font-semibold hover:underline">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signin;
