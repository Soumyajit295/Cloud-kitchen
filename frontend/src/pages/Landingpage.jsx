import React, { useState } from "react";
import header_img from "../assets/header_img.png";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import menu_1 from "../assets/menu_1.png";
import menu_2 from "../assets/menu_2.png";
import menu_3 from "../assets/menu_3.png";
import menu_4 from "../assets/menu_4.png";
import menu_5 from "../assets/menu_5.png";
import menu_6 from "../assets/menu_6.png";
import menu_7 from "../assets/menu_7.png";
import menu_8 from "../assets/menu_8.png";
import Category from "../components/Category";
import Herosection from "../components/Herosection";
import { fetchDesiredMenu } from "../Redux/Slices/foodSlice";

function Landingpage({ menuRef }) {
  const [category,setCategory] = useState('')
  const dispatch = useDispatch()

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    {name : "Salad",img : menu_1},
    {name : "Rolls",img : menu_2},
    {name : "Desserts",img : menu_3},
    {name : "Sandwich",img : menu_4},
    {name : "Cake",img : menu_5},
    {name : "Pure Veg",img : menu_6},
    {name : "Pasta",img : menu_7},
    {name : "Noodles",img : menu_8},
  ];

  const onChangeCategory = (item)=>{
    setCategory(item.name)
    dispatch(fetchDesiredMenu({category : item.name}))
  }

  return (
    <div className="w-full px-10 py-5">
      <Herosection scrollToMenu={scrollToMenu} header_img={header_img}/>

      {/* Menu Intro */}
      <div className="w-full mt-10">
        <h1 className="text-4xl text-slate-800 font-semibold mb-3">
          Explore our menu
        </h1>
        <p>Choose your food as per your mood, Good food makes mood happy</p>
      </div>

      {/* Scrollable Categories */}
      <div className="w-full overflow-x-auto p-5 mt-5 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
        <div className="flex flex-nowrap gap-6">
          {categories.map((item, index) => (
            <Category item={item} key={index} onChangeCategory={()=>onChangeCategory(item)}/>
          ))}
        </div>
      </div>

      {/* Menu Component */}
      <Menu ref={menuRef} category={category} />
    </div>
  );
}

export default Landingpage;
