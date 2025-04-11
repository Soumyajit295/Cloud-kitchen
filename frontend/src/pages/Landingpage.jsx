import React, { useState } from "react";
import header_img from "../assets/header_img.png";
import Menu from "./Menu";
import { useSelector } from "react-redux";

function Landingpage({ menuRef }) {

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const categories = ["Salad","Rolls","Deserts","Sandwitch","Cake","Pure veg","Pasta","Noodles"]

  return (
    <div className="w-full px-10 py-5">
      <div className="w-full justify-center hidden sm:flex relative">
        <img className="w-full align-middle" src={header_img} alt="header_img" />
        <div className="absolute top-10 md:top-20 lg:top-1/2 lg:-translate-y-1/2 left-5">
          <h1 className="text-white font-semibold text-4xl md:text-5xl mb-2">Order your</h1>
          <h1 className="text-white font-semibold text-4xl md:text-5xl">favourite food here</h1>
          <p className="text-slate-300 font-light text-xl">
            Feel the taste of home's kitchen, fast delivery and COD available
          </p>
          <button onClick={scrollToMenu} className="px-5 py-2 rounded-2xl bg-slate-100 mt-5">
            View menu
          </button>
        </div>
      </div>
      <div className="w-full mt-10">
        <h1 className="text-4xl text-slate-800 font-semibold mb-3">Explore our menu</h1>
        <p>Choose your food as per your mood,Good foods makes mood happy</p>
      </div>
      <div className="w-full overflow-auto p-5 border mt-5">
        <div className="p-2 border w-1/8">
          <div className="w-full rounded-full border p-2">

          </div>
        </div>
      </div>
      <Menu ref={menuRef} />
    </div>
  );
}

export default Landingpage;
