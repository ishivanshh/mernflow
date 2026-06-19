import React from "react";
import { Phone, MessageSquare, Star } from "lucide-react";
import firstMeetImage from "../assets/firstmeet.png";
import {Link} from "react-router-dom";


const Riding = () => {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
        <Link to = '/home' class ="fixed right-4 h-10 top-5 w-10 bg-white flex items-center justify-center rounded-full">
            <i class="ri-home-heart-line text-2xl font-medium"></i>
        </Link>
      {/* Map Section */}
      <div className="h-1/2 w-full">
        <img
         src={firstMeetImage}
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bottom Sheet */}
      <div className="h-1/2 bg-white rounded-t-3xl shadow-2xl p-5 overflow-y-auto">

        {/* Drag Handle */}
        <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        {/* Ride Status */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
             Dropping in
            </p>
            <h2 className="text-2xl font-bold">
              40 mins
            </h2>
          </div>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            Riding
          </span>
        </div>

        {/* Driver Card */}
        <div className="mt-5 border rounded-2xl p-4">

          <div className="flex justify-between items-center">

            <div className="flex gap-3 items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Driver"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  Rahul Sharma
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" />
                  <span>4.9</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <h3 className="font-bold text-lg">
                UP70 AB 2345
              </h3>

              <p className="text-gray-500">
                Honda Amaze
              </p>
            </div>

          </div>

          {/* Contact Buttons */}
          <div className="flex gap-3 mt-4">

            <button className="flex-1 bg-gray-100 py-3 rounded-xl flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              Message
            </button>

            <button className="bg-gray-100 p-3 rounded-xl">
              <Phone size={20} />
            </button>

          </div>
        </div>

        {/* Destination */}
        <div className="mt-5 border rounded-2xl p-4">

          <p className="text-gray-500 text-sm mb-1">
            Drop Location
          </p>

          <h3 className="font-semibold text-lg">
            Civil Lines, Prayagraj
          </h3>

          <p className="text-gray-400 text-sm">
            6.2 km • Approx 15 mins remaining
          </p>

        </div>

        {/* Fare Details */}
        <div className="mt-5 border rounded-2xl p-4">

          <div className="flex justify-between mb-3">
            <span className="text-gray-500">
              Ride Fare
            </span>

            <span className="font-semibold">
              ₹184
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Payment Method
            </span>

            <span className="font-medium">
              UPI
            </span>
          </div>

        </div>

        {/* Payment Button */}
        <button
          className="
            w-full
            mt-6
            bg-black
            text-white
            py-4
            rounded-2xl
            font-semibold
            text-lg
            hover:bg-gray-900
            transition
          "
        >
          Make Payment ₹184
        </button>

      </div>
    </div>
  );
};

export default Riding;