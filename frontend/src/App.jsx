import React , { useState } from 'react'
import {Route , Routes} from "react-router-dom";
import Star from "./pages/Start.jsx";
import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/Captainlogin.jsx";
import CaptainSignup from "./pages/captainSignup.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import Riding from './pages/Riding.jsx';
import CaptainRiding from './pages/CaptainRiding.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path= "/" element = { <Star/>} />

        <Route path= "/home" element = {
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>

        <Route path = "/user/logout" element = {<UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>}/>

        <Route path= "/login" element = { <UserLogin/>} />

        <Route path= "/signup" element = { <UserSignup/>} />

        <Route path= "/captain-login" element = { <CaptainLogin/>} />

        <Route path ="/riding" element = {<Riding/>} />
        <Route path ="/captain-riding" element = {<CaptainRiding/>} />

        

        <Route path= "/captain-signup" element = { <CaptainSignup/>} />

        <Route path ="/captain-home" element = {
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
          
        }/>
    
      </Routes>
    </div>
   )
}

export default App;
