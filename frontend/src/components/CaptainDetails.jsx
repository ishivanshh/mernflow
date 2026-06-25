import { useContext } from 'react'
import {CaptainDataContext} from "../contexts/CaptainContext.jsx";

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);

  if (!captain?.fullname) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Loading captain details...
      </div>
    );
  }

  const fullName = [captain.fullname.firstname, captain.fullname.lastname]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
           {/* Captain Info */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
           {/* add img tag here */}

            <div>
              <h4 className="text-lg font-semibold">
                {fullName}
              </h4>

              <p className="text-sm text-gray-500">
                Captain
              </p>
            </div>
          </div>

          <div className="text-right">
            <h4 className="text-2xl font-bold">
              ₹290.43
            </h4>

            <p className="text-sm text-green-600">
              Earned Today
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-100 rounded-2xl mt-6 p-10">

          <div className="flex justify-between">

            {/* Online Hours */}
            <div className="flex flex-col items-center">
              <i className="ri-timer-line text-3xl mb-2"></i>

              <h4 className="text-lg font-semibold">
                10.2
              </h4>

              <p className="text-xs text-gray-600">
                Hours Online
              </p>
            </div>

            {/* Trips */}
            <div className="flex flex-col items-center">
              <i className="ri-road-map-line text-3xl mb-2"></i>

              <h4 className="text-lg font-semibold">
                32
              </h4>

              <p className="text-xs text-gray-600">
                Total Trips
              </p>
            </div>

            {/* Distance */}
            <div className="flex flex-col items-center">
              <i className="ri-route-line text-3xl mb-2"></i>

              <h4 className="text-lg font-semibold">
                145 km
              </h4>

              <p className="text-xs text-gray-600">
                Distance
              </p>
            </div>

          </div>

        </div>
    </div>
  )
}

export default CaptainDetails
