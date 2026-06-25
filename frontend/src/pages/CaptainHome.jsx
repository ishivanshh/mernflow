import { useRef , useState } from "react";
import axios from "axios";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useEffect , useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { CaptainDataContext } from "../contexts/CaptainContext";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fallbackPosition = [28.6139, 77.209];

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [map, position]);

  return null;
};

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [locationError, setLocationError] = useState(() =>
    navigator.geolocation
      ? ""
      : "Geolocation is not supported by this browser.",
  );
  const [currentPosition, setCurrentPosition] = useState(null);
  const confirmRidePopupRef = useRef(null);
  const ridePopupPanelRef = useRef(null);
  const [ride, setride] = useState(null);
  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);

  useEffect(() => {
    if (!socket || !captain?._id) {
      return;
    }

    socket.emit('join', {
        userId: captain._id,
        userType: "captain",
    });
  }, [socket, captain?._id]);

  useEffect(() => {
    if (!socket || !captain?._id || !navigator.geolocation) {
      return undefined;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setCurrentPosition([location.lat, location.lon]);
        setLocationError("");
        socket.emit("update-location-captain", {
          userId: captain._id,
          location,
        });
      },
      (error) => {
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? "Please allow location access to receive nearby rides."
            : error.message || "Unable to fetch your current location.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [socket, captain?._id]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewRide = (data) => {
      console.log(data);
      setride(data);
      setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel],
  );

  useGSAP(
    function () {
      if (confirmRidePopup) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopup],
  );

  async function confirmRide(){
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId : ride._id,
      captainId : captain._id,

    }, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
      setRidePopupPanel(false)
      setConfirmRidePopup(true)
  }

  return (
    <div className="relative h-screen bg-white overflow-hidden">

      {/* Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-end z-[1200]">
        <button className="bg-white shadow-md p-2 rounded-full">
          <i className="ri-logout-box-r-line text-2xl"></i>
        </button>
      </div>

      <div className="relative z-0 h-2/3">
        <MapContainer
          center={currentPosition ?? fallbackPosition}
          zoom={16}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap position={currentPosition} />
          {currentPosition && (
            <CircleMarker
              center={currentPosition}
              radius={9}
              pathOptions={{
                color: "white",
                fillColor: "#16a34a",
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>Your current location</Popup>
            </CircleMarker>
          )}
        </MapContainer>
      </div>

      {/* Bottom Panel */}
      <div className="relative z-[500] h-1/3 bg-white rounded-2xl p-5 shadow-lg">
      {locationError && (
        <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
          {locationError}
        </p>
      )}
      <CaptainDetails/>
      </div>
      <div ref ={ridePopupPanelRef}
       className="fixed z-[1300] bottom-0 left-0 bg-white px-3 translate-y-full py-10 pt-12 w-full shadow-2xl">
       <RidePopUp 
       ride={ride}
       setRidePopupPanel = {setRidePopupPanel} 
       setConfirmRidePopup = {setConfirmRidePopup}
       confirmRide={confirmRide} 
       />
      </div>
      <div ref = {confirmRidePopupRef}
       className="fixed z-[1400] bottom-0 left-0 bg-white px-3 py-10 translate-y-full pt-12 w-full shadow-2xl">
       <ConfirmRidePopup  
       ride={ride}
       setConfirmRidePopup ={setConfirmRidePopup} setRidePopupPanel = {setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
