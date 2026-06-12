import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const captainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email , password);
    setUserData({
      username: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    })
    //console.log(userData);

    setEmail(" ");
    setPassword(" ");
    setFirstname(" ");
    setLastname(" ");
  }

    return (
      <div class="p-7 h-screen flex flex-col justify-between">
        <div>
          <img class="w-16 mb-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEzKW4r4SmPFZ9NLQgincQ_Z2XBHD70su6Q&s" alt="logo" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 class='text-xl font-base mb-2'>What's Your Name</h3>
            <div class="flex gap-4 mb-5">
              <input
                required
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}
                class="bg-[#eeeeee]  rounded px-4 py-2 border  w-1/2 text-base placeholder:text-sm" type="text"
                placeholder='Enter Your First Name'
              />
              <input
                required
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value)
                }}
                class="bg-[#eeeeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-sm" type="text"
                placeholder='Enter Your Last Name'
              />
            </div>

            <h3 class='text-xl font-base mb-2'>Whats Your Email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm" type="email"
              placeholder='email@example.com'
            />

            <h3 class="text-xl mb-2 font-base ">Enter Password</h3>

            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.password)
              }}
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm" type="password"
              placeholder='Enter Your password'
            />
            <button class="bg-black text-white mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base">Login</button>

          </form>
          <p class="text-center">Already Have Account? <Link to="/login" class="text-blue-600">Login</Link> </p>
        </div>
        <div>
          <p class="text-[9px] leading-tight text-center">By proceeding you consent to get messages, calls and mails including by automated means , from uber and its affiliates to the mail provided and ensure all the details submitted by captain must be correct</p>
        </div>
      </div>
    )
  };

export default captainSignup