import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from "../contexts/CaptainContext.jsx";
import axios from 'axios';


const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { captain , setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
   const captain = {
      email : email,
      password : password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain,
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain)
        localStorage.setItem("token", data.token);

        // If using CaptainContext
        // setCaptain(data.captain);

        navigate("/captain-home");
      }
    } catch (error) {
      console.log("Status:", error.response?.status);

      error.response?.data?.errors?.forEach((err) => {
        console.log("Field:", err.path, "Message:", err.msg);
      });
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div class = "p-7 h-screen flex flex-col justify-between">
    <div>
    <img class = "w-16 mb-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEzKW4r4SmPFZ9NLQgincQ_Z2XBHD70su6Q&s" alt="logo" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>
      <h3 class='text-xl font-medium mb-2'>Whats Your Email</h3>
      <input 
      required 
      value={email}
      onChange={(e)=>{
        setEmail(e.target.value)
      }}
      class = "bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base" type="email" 
      placeholder='email@example.com' 
      />

      <h3 class= "text-xl mb-2 font-medium ">Enter Password</h3>

      <input 
      required
      value={password}
      onChange={(e) => {
        setPassword(e.target.value)
      }}
      class = "bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base" type="password"
      placeholder='Enter Your password'
      />
      <button class = "bg-black text-white mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base">Login</button>

    </form>
    <p class ="text-center">New Here?<Link to= "/captain-signup" class = "text-blue-600">Register as a captain</Link> </p>
    </div>
    <div>
    <Link to ="/login" class = "bg-gray-700 flex items-center justify-center text-white mb-7 rounded px-4 py-3 border  w-full text-lg placeholder:text-base">Sign in as user</Link>
    </div>
  </div>
  )
}

export default Captainlogin