import { useRef , useState } from "react";
import axios from "axios";
import firstMeetImage from "../assets/firstmeet.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useEffect , useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { CaptainDataContext } from "../contexts/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [locationError, setLocationError] = useState("");
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

    const updateLocation = () => {
      if (!navigator.geolocation) {
        setLocationError("Location access is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

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
              : "Unable to fetch your current location.",
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);

    return () => clearInterval(locationInterval);
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
      {locationError && (
        <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
          {locationError}
        </p>
      )}
      <CaptainDetails/>
      </div>
      <div ref ={ridePopupPanelRef}
       class="fixed z-10 bottom-0 bg-white px-3 translate-y-full py-10 pt-12 w-full">
       <RidePopUp 
       ride={ride}
       setRidePopupPanel = {setRidePopupPanel} 
       setConfirmRidePopup = {setConfirmRidePopup}
       confirmRide={confirmRide} 
       />
      </div>
      <div ref = {confirmRidePopupRef}
       class="fixed z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12 w-full">
       <ConfirmRidePopup  
       ride={ride}
       setConfirmRidePopup ={setConfirmRidePopup} setRidePopupPanel = {setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
