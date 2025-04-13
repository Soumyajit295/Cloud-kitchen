import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { signout } from "../Redux/Slices/userauthSlice";

function Navbar({ scrollToMenu, onSigninClick }) {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignout = async () => {
    const res = await dispatch(signout());
    if (res?.payload?.success) {
      setIsSidebarOpen(false);
      if (isDropDownOpen) {
        setIsDropDownOpen(false);
      }
      navigate("/");
    }
  };

  return (
    <div className="w-full px-10 py-5 flex items-center justify-between relative">
      <img className="w-35" src={logo} alt="Brand_logo" />

      {/* Desktop menu */}
      <div className="hidden md:flex w-1/2 px-10 gap-x-10 justify-center text-xl">
        <Link to="/" className="hover:text-orange-600 transition-all">
          Home
        </Link>
        <button
          onClick={scrollToMenu}
          className="hover:text-orange-600 transition-all"
        >
          Menu
        </button>
        <Link to="/contact" className="hover:text-orange-600 transition-all">
          Contact us
        </Link>
      </div>

      <div className="hidden md:flex gap-x-10 items-center relative">
        {
          isLoggedIn && user.role!=='seller' && (
            <FaShoppingCart
              size={30}
              className="text-slate-900 hover:text-orange-600 transition-all cursor-pointer"
            />
          )
        }
        {isLoggedIn ? (
          <FaUserCircle
            size={30}
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          />
        ) : (
          <button
            onClick={onSigninClick}
            className="px-5 py-2 border border-orange-600 rounded-2xl font-semibold hover:bg-orange-600 hover:text-white transition-all"
          >
            Sign in
          </button>
        )}

        {/* Profile dropdown */}

        {isDropDownOpen && (
          <div className="absolute top-10 right-2 z-50 w-56 rounded-xl bg-white shadow-xl p-4 text-slate-800">
            {
              /* For seller */
              user?.role === "seller" && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsDropDownOpen(false);
                    }}
                    className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                  >
                    Admin
                  </Link>
                  <Link
                    to="/admin/foodlist"
                    className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                  >
                    Foods
                  </Link>
                  <Link
                    to="/admin/order"
                    className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                  >
                    View Orders
                  </Link>
                </>
              )
            }
            {isLoggedIn && user.role !== "seller" && (
              <>
                <Link
                  to="/myorder"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsDropDownOpen(false);
                  }}
                  className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  My orders
                </Link>
                <Link
                  to="/cart"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsDropDownOpen(false);
                  }}
                  className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  Cart
                </Link>
                <Link
                  to="/contact"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsDropDownOpen(false);
                  }}
                  className="block px-4 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  Contact us
                </Link>
              </>
            )}
            <button
              onClick={onSignout}
              className="mt-3 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md font-semibold transition-all duration-300"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsSidebarOpen(true)}>
          <FaBars size={25} />
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="absolute top-0 right-0 h-screen md:w-full sm:w-1/2 lg:w-2/3 bg-slate-100 text-slate-800 z-50 p-6 flex flex-col gap-6 transition-all duration-300 border border-l-orange-600">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setIsSidebarOpen(false)}>
              <FaTimes size={25} />
            </button>
          </div>
          {user?.role === "seller" && (
            <>
              <Link
                to="/admin"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-orange-500"
              >
                Admin
              </Link>
              <Link to="/admin/foodlist" className="hover:text-orange-500">
                Foods
              </Link>
              <Link to="/admin/order" className="hover:text-orange-500">
                View Orders
              </Link>
            </>
          )}
          {isLoggedIn && user.role != "seller" && (
            <>
              <button
                onClick={() => {
                  scrollToMenu();
                  setIsSidebarOpen(false);
                }}
                className="hover:text-orange-500 text-left"
              >
                Menu
              </button>
              <Link
                to="/myorder"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-orange-500"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-orange-500"
              >
                Cart
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-orange-500"
              >
                Contact us
              </Link>
            </>
          )}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-600">
            {isLoggedIn ? (
              <button onClick={onSignout}>Sign out</button>
            ) : (
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  onSigninClick();
                }}
                className="px-4 py-1 border border-orange-500 rounded-xl hover:bg-orange-500 hover:text-white"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
