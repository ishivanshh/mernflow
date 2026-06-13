import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});


  const { user , setUser } = useContext(UserDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
  e.preventDefault();
  
  console.log("password state: ", password);

  const userData = {
    email,
    password,
  };
  // console.log(userData);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    console.log(response.data);

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate("/home");
    }
  } catch (error) {
    console.log(error.response?.status);
    console.log(error.response?.data);
  }

    setEmail(" ");
    setPassword(" ");
  };

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
        type="password"
        value={password}
        onChange={(e) => {
          // console.log(e.target.value);
          setPassword(e.target.value)
        }}
        class = "bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base" 
        placeholder='Enter Your password'
        />
        <button class = "bg-black text-white mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base">Login</button>

      </form>
      <p class ="text-center">New Here?<Link to= "/signup" class = "text-blue-600">Create new account</Link> </p>
      </div>
      <div>
      <Link to ="/captain-login" class = "bg-gray-700 flex items-center justify-center text-white mb-7 rounded px-4 py-3 border  w-full text-lg placeholder:text-base">Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin