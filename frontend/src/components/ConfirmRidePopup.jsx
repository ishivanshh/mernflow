import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRide = (props) => {

  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className="h-screen bg-white flex flex-col overflow-scroll">

      {/* Header */}
      <div className="bg-black text-white p-6 mt-15">
        <h1 className="text-2xl font-bold">New Ride Request</h1>
        <p className="text-gray-300 mt-1">
          Review details before accepting
        </p>
      </div>

      {/* Passenger */}
      <div className="p-5 bg-yellow-100 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43"
            alt="Passenger"
          />

          <div>
            <h2 className="text-xl font-semibold">
              Shivansh Saxena
            </h2>
            <p className="text-gray-600">
              Passenger
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            2.5 KM
          </h2>
        </div>
      </div>

      {/* Ride Details */}
      <div className="flex-1 p-5">

        <div className="space-y-6">

          {/* Pickup */}
          <div className="flex gap-4 border-b pb-5">
            <i className="ri-map-pin-user-fill text-2xl"></i>

            <div>
              <h3 className="text-lg font-medium">Mamta Trader's</h3>
                <p className="text-sm -mt-1 text-gray-700">Brij Bihar Colony, Shahjahanpur</p>
            </div>
          </div>

          {/* Drop */}
          <div className="flex gap-4 border-b pb-5">
            <i className="ri-map-pin-2-fill text-2xl"></i>

            <div>
             <h3 className="text-lg font-medium">One 8 Resturant</h3>
                <p className="text-sm -mt-1 text-gray-700">Hauz khas ,North Delhi</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex gap-4 border-b pb-5">
            <i className="ri-money-rupee-circle-fill text-2xl"></i>

            <div>
              <h3 className="font-semibold text-lg">
                Ride Fare
              </h3>

              <p className="text-gray-600">
                $192.32
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex gap-4 border-b pb-5">
            <i className="ri-bank-card-fill text-2xl"></i>

            <div>
              <h3 className="font-semibold text-lg">
                Payment Method
              </h3>

              <p className="text-gray-600">
                Cash
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-5  bg-white">
         <div className="flex mb-10 items-center w-full justify-center">
            <form onSubmit={submitHandler}>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="number"
                placeholder="Enter 4 Digit OTP"
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              />
            </form>
          </div>

        <Link to = '/captain-riding' onClick={() => {
            
        }}
          className="
            w-full
            flex *
            justify-center
            bg-green-600
            text-white
            py-4
            rounded-xl
            text-lg
            font-semibold
            mb-3
          "
        >
          Confirm Ride
        </Link>

        <button onClick={() => {
            props.setConfirmRidePopup(false);
            props.setRidePopupPanel(false);
        }}
          className="
            w-full
            bg-red-100
            text-red-600
            py-4
            rounded-xl
            text-lg
            font-semibold
          "
        >
          Cancel Ride
        </button>

      </div>
    </div>
  );
};

export default ConfirmRide;