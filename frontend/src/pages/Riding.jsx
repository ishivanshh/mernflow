import { Star } from "lucide-react";
import firstMeetImage from "../assets/firstmeet.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect , useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const captain = ride?.captain;
  const vehicle = captain?.vehicle;
  const captainName = captain?.fullname
    ? `${captain.fullname.firstname ?? ""} ${captain.fullname.lastname ?? ""}`.trim()
    : "Captain";
  const vehicleName = [vehicle?.color, vehicle?.vehicleType]
    .filter(Boolean)
    .join(" ");

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended', () => {
    navigate('/home')
  })




  return (
    <div className="h-screen w-full bg-white flex flex-col">
        <Link to = '/home' className ="fixed right-4 h-10 top-5 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="ri-home-heart-line text-2xl font-medium"></i>
        </Link>
      <div className="h-1/2 w-full">
        <img
         src={firstMeetImage}
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="h-1/2 bg-white rounded-t-3xl shadow-2xl p-5 overflow-y-auto">

        <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
             Ride status
            </p>
            <h2 className="text-2xl font-bold">
              {ride?.status ?? "Ongoing"}
            </h2>
          </div>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            Riding
          </span>
        </div>

        <div className="mt-5 border rounded-2xl p-4">

          <div className="flex justify-between items-center">

            <div className="flex gap-3 items-center">
              <img
                src=""
                alt="Driver"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg ">
                  {captainName}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" />
                  <span>4.9</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <h3 className="font-bold text-sm">
                {vehicle?.plate ?? "--"}
              </h3>

              <p className="capitalize text-gray-500">
                {vehicleName || "Vehicle details unavailable"}
              </p>
              <p className="text-sm text-gray-400">
                Max: {vehicle?.capacity ?? "--"}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-5 border rounded-2xl p-4">
          <p className="text-gray-500 text-sm mb-1">
            Pickup Location
          </p>

          <h3 className="font-semibold text-lg">
            {ride?.pickup ?? "Pickup not available"}
          </h3>
        </div>

        <div className="mt-5 border rounded-2xl p-4">

          <p className="text-gray-500 text-sm mb-1">
            Drop Location
          </p>

          <h3 className="font-semibold text-lg">
            {ride?.destination ?? "Destination not available"}
          </h3>

          <p className="text-gray-400 text-sm">
            Captain will drop you at this location
          </p>

        </div>

        <div className="mt-5 border rounded-2xl p-4">

          <div className="flex justify-between mb-3">
            <span className="text-gray-500">
              Ride Fare
            </span>

            <span className="font-semibold">
              ₹{ride?.fare ?? "--"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Payment Method
            </span>

            <span className="font-medium">
              CASH
            </span>
          </div>

        </div>

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
          Make Payment ₹{ride?.fare ?? "--"}
        </button>

      </div>
    </div>
  );
};

export default Riding;
