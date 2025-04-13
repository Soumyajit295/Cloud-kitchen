import React from 'react';

function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-slate-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">401</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="mb-6 text-slate-800">You do not have permission to view this page.</p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default Unauthorized;
