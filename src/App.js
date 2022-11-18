import "bootstrap/dist/css/bootstrap.min.css";

import Navibar from "./components/navbar/Navibar";
import { LandingPage } from "./Pages/LandingPage";
import { DetailProduct } from "./Pages/DetailProduct";

import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import { AppContext } from "./components/contexts/AppContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const loginContext = {
    isLogin: isLogin,
    setIsLogin: setIsLogin
  }

  const showContext = {
    showLogin: showLogin,
    setShowLogin: setShowLogin,
    showRegister: showRegister,
    setShowRegister: setShowRegister
  }

  const appContextsValue = {
    loginContext: loginContext,
    showContext: showContext
  }

  return (
    <div>
      <AppContext.Provider value={appContextsValue}>
        <Router>
          <Navibar/>
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
          /> 
          <Routes>
            <Route exact path='/' element={<LandingPage/>} ></Route>
            <Route exact path='/menu/:id/:menuName' element={<DetailProduct/>}></Route>
          </Routes>
        </Router>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
