import axios from "axios";
import { useNavigate } from "react-router-dom";



const FinishRide = (props) => {

  const navigate = useNavigate();
  const passenger = props.ride?.user;
  const passengerName = passenger?.fullname
    ? `${passenger.fullname.firstname ?? ""} ${passenger.fullname.lastname ?? ""}`.trim()
    : "Passenger";


   async function endRide () {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      
        rideId : props.ride._id
    },{
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status === 200){
        navigate('/captain-home')
      }
    }

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
         {/* u can add image here  */}

          <div>
            <h3 className="font-semibold text-lg capitalize">
              {passengerName}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <h2 className="font-bold text-2xl">
            ₹{props.ride?.fare ?? "--"}
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
                {props.ride?.pickup ?? "Pickup not available"}
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
                {props.ride?.destination ?? "Destination not available"}
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
                {props.ride?.distance ? `${props.ride.distance} km` : "Not available"}
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

        <button onClick={endRide}
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
