import React, { forwardRef } from "react";

const Menu = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="mt-20 px-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-100 rounded-lg shadow">Pizza</div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">Burger</div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">Pasta</div>
        {/* Add more food items here */}
      </div>
    </div>
  );
});

export default Menu;
