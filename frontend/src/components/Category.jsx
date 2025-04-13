import React from "react";

function Category({item,onChangeCategory}) {
  return (
    <div
      onClick={onChangeCategory}
      className="p-4 min-w-[140px] bg-white shadow-md hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 rounded-xl flex flex-col items-center"
    >
      <div className="w-20 h-20 overflow-hidden rounded-full mb-3">
        <img src={item.img} alt={item} className="w-full h-full object-cover" />
      </div>
      <h1 className="text-center text-slate-800 font-medium">{item.name}</h1>
    </div>
  );
}

export default Category;
