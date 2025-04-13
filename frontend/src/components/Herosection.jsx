import React from 'react'

function Herosection({header_img,scrollToMenu}) {
  return (
    <div className="w-full justify-center hidden sm:flex relative">
        <img
          className="w-full align-middle"
          src={header_img}
          alt="header_img"
        />
        <div className="absolute top-10 md:top-20 lg:top-1/2 lg:-translate-y-1/2 left-5">
          <h1 className="text-white font-semibold text-4xl md:text-5xl mb-2">
            Order your
          </h1>
          <h1 className="text-white font-semibold text-4xl md:text-5xl">
            favourite food here
          </h1>
          <p className="text-slate-300 font-light text-xl">
            Feel the taste of home's kitchen, fast delivery and COD available
          </p>
          <button
            onClick={scrollToMenu}
            className="px-5 py-2 rounded-2xl bg-slate-100 mt-5 hover:bg-white transition"
          >
            View menu
          </button>
        </div>
      </div>
  )
}

export default Herosection