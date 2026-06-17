import React from "react";
import {
  MessageSquare,
  Phone,
  MoreHorizontal,
  Flag,
} from "lucide-react";

const  WaitingForDriver = (props) => {
  return (
    <div><h5
        onClick={() => props.setConfirmRidePanel(false)}
        class="text-center text-2xl w-100% absolute p-1 top-0 mx-55">
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
    <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-lg p-4 space-y-4">

      {/* Pickup Time */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-10">Pickup in 1 min</h2>
      </div>

      {/* PIN */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 font-medium">PIN for this ride</p>

        <div className="flex gap-1">
          {["3", "3", "2", "0"].map((num, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded font-bold text-lg"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Ride Details */}
      <div className="border rounded-2xl p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Ride details</p>
            <h3 className="font-semibold text-xl mt-1">
              Meet at the pickup point
            </h3>
          </div>

          <button className="bg-gray-100 p-2 rounded-lg">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Driver Card */}
      <div className="border rounded-2xl p-4">

        <div className="flex items-center justify-between">

          {/* Driver Info */}
          <div className="flex items-center gap-3">

            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43"
              alt="Driver"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm">⭐</span>
                <span className="font-medium">4.93</span>
              </div>

              <h4 className="font-semibold">
                Mukesh Rajput
              </h4>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="text-right">
            <h3 className="font-bold text-lg">
              TS08AB0214
            </h3>

            <p className="text-gray-500">
              Black Honda CB Shine
            </p>

            <p className="text-sm text-gray-400 mt-1">
              2,965 trips
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">

          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl font-medium">
            <MessageSquare size={18} />
            Send a message
          </button>

          <button className="bg-gray-100 p-3 rounded-xl">
            <Phone size={20} />
          </button>

          <button className="bg-gray-100 p-3 rounded-xl">
            <MoreHorizontal size={20} />
          </button>

        </div>
      </div>

      {/* Safety Banner */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src="https://media.licdn.com/dms/image/v2/D4E22AQFftkpXq4a1kw/feedshare-shrink_800/B4EZY.sG4jHUAo-/0/1744808472873?e=2147483647&v=beta&t=gmdEKNC8GJ9x7U5ZJ_W0KG7SnNK-XAQitgf08h5t1_A"
          alt="advertising"
          className="w-full h-40 object-cover"
        />
      </div>

    </div>
    </div>
)};

export default WaitingForDriver;