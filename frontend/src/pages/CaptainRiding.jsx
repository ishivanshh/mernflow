import React from "react";
import firstMeetImage from "../assets/firstmeet.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import FinishRide from "../components/FinishRide.jsx";

const CaptainRiding = () => {

   const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);


  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel],
  );

  return (
    <div className="h-screen bg-white relative">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-end z-10">
        <button className="bg-white shadow-md p-2 rounded-full">
          <i className="ri-logout-box-r-line text-2xl"></i>
        </button>
      </div>

      {/* Map Section */}
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src={firstMeetImage}
          alt="Map"
        />
      </div>
      <div onClick={() => {
        setFinishRidePanel(true)
      }}
       class="h-1/5 relative pt-10 bg-amber-500 p-6 flex items-center  justify-between">
        <h5 onClick={() => {}} class="text-center text-black absolute top-0 p-1  mx-45 text-2xl w-[][90]%">
          <i class="ri-arrow-down-wide-fill text-black text-3xl"></i>
        </h5>

        <h3 class="text-xl font-medium">4KM Away</h3>
        <button class="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Completed Ride
        </button>
      </div>
      <div ref = {finishRidePanelRef}
       class="fixed z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12 w-full">
       <FinishRide setFinishRidePanel = {setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
