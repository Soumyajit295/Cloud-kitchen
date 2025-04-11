import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/landingPage";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  const menuRef = useRef(null);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    console.log("Signin pop up: ", showSignin);
    console.log("Signup pop up: ", showSignup);
  }, [showSignin, showSignup]);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <Navbar 
        scrollToMenu={scrollToMenu} 
        onSigninClick={() => setShowSignin(true)} 
      />
      <Routes>
        <Route path="/" element={<Landingpage menuRef={menuRef} />} />
      </Routes>

      {showSignin && (
        <Signin
          onClose={() => setShowSignin(false)}
          onSwitchToSignup={() => {
            setShowSignin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <Signup 
        onClose={() => setShowSignup(false)} 
        onSwitchToSignin={() => {
          setShowSignin(true);
          setShowSignup(false);
        }}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
