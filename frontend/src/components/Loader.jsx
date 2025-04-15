import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-5 bg-gray-800 rounded"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-gray-700 rounded-full"></div>
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-500"></div>
        </div>
        <p className="text-orange-700 text-xl font-semibold animate-pulse">
          Preparing your delicious experience...
        </p>
      </div>
    </div>
  );
}

export default Loader;
