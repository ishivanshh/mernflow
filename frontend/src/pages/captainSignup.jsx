import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CaptainDataContext } from "../contexts/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const captainSignup = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email , password);
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData,
      );

      if (response.status === 201) {
        const data = response.data;

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

    //console.log(userData);
    //console.log(error.response.data.errors);

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
  };

  return (
    <div class="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          class="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEzKW4r4SmPFZ9NLQgincQ_Z2XBHD70su6Q&s"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 class="text-xl font-base mb-2">What's Your Name</h3>
          <div class="flex gap-4 mb-5">
            <input
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              class="bg-[#eeeeee]  rounded px-4 py-2 border  w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="Enter Your First Name"
            />
            <input
              required
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              class="bg-[#eeeeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-sm"
              type="text"
              placeholder="Enter Your Last Name"
            />
          </div>

          <h3 class="text-xl font-base mb-2">Whats Your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />

          <h3 class="text-xl mb-2 font-base ">Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
            type="password"
            placeholder="Enter Your password"
          />
          <h3 class="text-xl mb-2 font-base ">Vehicle Information </h3>
          <div class="flex gap-4 mb-7">
            <input
              required
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              required
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
              type=" text"
              placeholder="Vehicle Plate"
            />
          </div>
          <div class="flex gap-4 mb-7">
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
              type="number"
              placeholder=" Vehicle Capacity"
            />
            <select
              required
              class="bg-[#eeeeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-sm"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Moto</option>
            </select>
          </div>

          <button class="bg-black text-white mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p class="text-center">
          Already Have Account?{" "}
          <Link to="/login" class="text-blue-600">
            Login
          </Link>{" "}
        </p>
      </div>
      <div>
        <p class="text-[9px] leading-tight text-center">
          By proceeding you consent to get messages, calls and mails including
          by automated means , from uber and its affiliates to the mail provided
          and ensure all the details submitted by captain must be correct
        </p>
      </div>
    </div>
  );
};

export default captainSignup;
