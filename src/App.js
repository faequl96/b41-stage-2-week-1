import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/navbar/Navibar";
import { LandingPage } from "./Pages/LandingPage";
import { DetailProduct } from "./Pages/DetailProduct";

import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { AppContext } from "./components/contexts/AppContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { MyCart } from "./Pages/MyCart";
import { MyProfile } from "./Pages/MyProfile";

function App() {
  if(localStorage.getItem("userLogin") == null) {
		localStorage.setItem('userLogin', JSON.stringify({id: 0}))
	}
  if(localStorage.getItem("transactionDataAdmin") == null) {
		localStorage.setItem(`transactionDataAdmin`, '[]');
	}
  localStorage.setItem(`myCart0`, '[]');
  
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));
  let myCart = [];
  if(userLogin.role === 'user') {
    myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));
  } else {
    myCart = JSON.parse(localStorage.getItem(`myCart0`));
  }

  const [isLogin, setIsLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [regisMessage, setRegisMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [cartLength, setCartLength] = useState();

  useEffect(() => {
    setCartLength(myCart.length)
  }, [myCart])
  
  const loginContext = {
    isLogin: isLogin,
    setIsLogin: setIsLogin
  }

  const cartContext = {
    cartLength: cartLength,
    setCartLength: setCartLength
  }

  const showContext = {
    showLogin: showLogin,
    setShowLogin: setShowLogin,
    showRegister: showRegister,
    setShowRegister: setShowRegister
  }

  const appContextsValue = {
    loginContext: loginContext,
    showContext: showContext,
    cartContext: cartContext
  }

  return (
    <div>
      <AppContext.Provider value={appContextsValue}>
        <Router>
          <Navibar />
          <Login 
            show={showLogin}
            setShow={setShowLogin}
            setShowRegister={setShowRegister}
            setIsLogin={setIsLogin}
            loginMessage={loginMessage} 
            setLoginMessage={setLoginMessage}
          />
          <Register
            show={showRegister}
            setShow={setShowRegister}
            setShowLogin={setShowLogin}
            regisMessage={regisMessage} 
            setRegisMessage={setRegisMessage}
          /> 
          <Routes>
            <Route exact path='/' element={<LandingPage/>} ></Route>
            <Route exact path='/menu/:id/:menuName' element={<DetailProduct/>}></Route>
            <Route exact path='/mycart' element={<MyCart/>}></Route>
            <Route exact path='/myprofile' element={<MyProfile/>}></Route>
          </Routes>
        </Router>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
