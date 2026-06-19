import React from "react";

const FinishRide = () => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-scroll">

      {/* Success Header */}
      <div className="bg-green-600 text-white p-2 text-center mt-15 ">
        <i className="ri-checkbox-circle-fill text-6xl"></i>

        <h1 className="text-3xl font-bold mt-2">
          Ride Completed
        </h1>

        <p className="text-green-100 mt-1">
          Passenger dropped off successfully
        </p>
      </div>

      {/* Passenger Info */}
      <div className="p-5 flex items-center justify-between border-b">

        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43"
            alt="Passenger"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-lg">
              Shivansh Saxena
            </h3>

            <p className="text-gray-500">
              Passenger
            </p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="font-bold text-2xl">
            $192.32
          </h2>

          <p className="text-green-600 text-sm">
            Earned
          </p>
        </div>

      </div>

      {/* Ride Details */}
      <div className="flex-1 p-5">

        <h3 className="text-xl font-semibold mb-5">
          Trip Summary
        </h3>

        <div className="space-y-5">

          {/* Pickup */}
          <div className="flex gap-4 border-b pb-4">
            <i className="ri-map-pin-user-fill text-xl"></i>

            <div>
              <h4 className="font-medium">
                Pickup
              </h4>

              <p className="text-gray-600">
                Lanka Gate, BHU, Varanasi
              </p>
            </div>
          </div>

          {/* Drop */}
          <div className="flex gap-4 border-b pb-4">
            <i className="ri-map-pin-2-fill text-xl"></i>

            <div>
              <h4 className="font-medium">
                Drop Location
              </h4>

              <p className="text-gray-600">
                Cantt Railway Station, Varanasi
              </p>
            </div>
          </div>

          {/* Distance */}
          <div className="flex gap-4 border-b pb-4">
            <i className="ri-route-line text-xl"></i>

            <div>
              <h4 className="font-medium">
                Distance Travelled
              </h4>

              <p className="text-gray-600">
                12.4 km
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex gap-4 border-b pb-4">
            <i className="ri-time-fill text-xl"></i>

            <div>
              <h4 className="font-medium">
                Ride Duration
              </h4>

              <p className="text-gray-600">
                28 Minutes
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex gap-4 border-b pb-4">
            <i className="ri-bank-card-fill text-xl"></i>

            <div>
              <h4 className="font-medium">
                Payment Method
              </h4>

              <p className="text-gray-600">
                Cash
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 border-t">

        <button
          className="
            w-full
            bg-green-600
            text-white
            py-4
            rounded-xl
            font-semibold
            text-lg
          "
        >
          End Ride
        </button>
      </div>

    </div>
  );
};

export default FinishRide;