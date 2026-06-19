import React from "react";
import firstMeetImage from "../assets/firstmeet.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";

const CaptainHome = () => {
  return (
    <div className="h-screen bg-white">

      {/* Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-end z-10">
        <button className="bg-white shadow-md p-2 rounded-full">
          <i className="ri-logout-box-r-line text-2xl"></i>
        </button>
      </div>

      {/* Map Section */}
      <div className="h-2/3">
        <img
          className="h-full w-full object-cover"
          src={firstMeetImage}
          alt="Map"
        />
      </div>

      {/* Bottom Panel */}
      <div className="h-1/3 bg-white rounded-2xl p-5 shadow-lg">
      <CaptainDetails/>
      </div>
      <div class="fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 w-full">
       <RidePopUp/>
      </div>
    </div>
  );
};

export default CaptainHome;