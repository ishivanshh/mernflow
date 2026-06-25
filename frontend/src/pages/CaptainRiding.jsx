import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FinishRide from "../components/FinishRide.jsx";
import { useLocation } from "react-router-dom";


const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  const passenger = rideData?.user;
  const passengerName = passenger?.fullname
    ? `${passenger.fullname.firstname ?? ""} ${passenger.fullname.lastname ?? ""}`.trim()
    : "Passenger";
  const mapPosition = [
    rideData?.captain?.location?.lat ?? 28.6139,
    rideData?.captain?.location?.lon ?? 77.209,
  ];

 

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
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-end z-[1200]">
        <button className="bg-white shadow-md p-2 rounded-full">
          <i className="ri-logout-box-r-line text-2xl"></i>
        </button>
      </div>

      <div className="relative z-0 h-4/5">
        <MapContainer
          center={mapPosition}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition} />
        </MapContainer>
      </div>
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="relative z-[500] h-1/5 bg-amber-500 p-5 pt-8 flex items-center justify-between gap-3"
      >
        <h5 className="text-center text-black absolute top-0 left-1/2 -translate-x-1/2 p-1 text-2xl">
          <i className="ri-arrow-up-wide-fill text-black text-3xl"></i>
        </h5>

        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold capitalize">{passengerName}</h3>
          <p className="truncate text-sm text-amber-950"> Drop :{rideData?.destination ?? "Destination not available"}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium text-amber-950">Fare</p>
          <p className="text-lg font-bold">₹{rideData?.fare ?? "--"}</p>
        </div>
        <button
        className="shrink-0 bg-green-600 text-white font-medium p-3 px-1 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed z-[1400] bottom-0 left-0 bg-white px-3 py-10 translate-y-full pt-12 w-full shadow-2xl"
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
