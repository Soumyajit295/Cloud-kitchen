import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Landingpage from "./pages/landingPage";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import AdminAuth from "./components/AdminAuth";
import Orders from "./pages/Orders";
import Foodlist from "./pages/Foodlist";
import LoginAuth from "./components/LoginAuth";
import Cart from "./pages/Cart";
import Myorder from "./pages/Myorder";
import { setShowSignin, setShowSignup } from "./Redux/Slices/authSlice";
import { validateUser } from "./Redux/Slices/userauthSlice";

function App() {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { showSignin, showSignup } = useSelector((state) => state.auth);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=>{
    dispatch(validateUser())
  },[dispatch])

  return (
    <BrowserRouter>
      <Navbar
        scrollToMenu={scrollToMenu}
        onSigninClick={() => dispatch(setShowSignin(true))}
      />
      <Routes>
        <Route path="/" element={<Landingpage menuRef={menuRef} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<LoginAuth />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<Myorder />} />
        </Route>
        <Route element={<AdminAuth />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/foodlist" element={<Foodlist />} />
          <Route path="/admin/order" element={<Orders />} />
        </Route>
      </Routes>

      {showSignin && (
        <Signin/>
      )}
      {showSignup && (
        <Signup/>
      )}
    </BrowserRouter>
  );
}

export default App;
