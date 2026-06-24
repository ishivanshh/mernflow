import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import axios from "axios";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SocketContext } from "../contexts/SocketContext.jsx";
import { UserDataContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";


const fallbackPosition = [28.6139, 77.209];

// Keeps the Leaflet map centered whenever the browser reports a new position.
const RecenterMap = ({ position }) => {
  const map = useMap();

  // Moves the existing map instance instead of recreating it after GPS updates.
  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [map, position]);

  return null;
};

// Renders the rider home screen and coordinates the location and ride panels.
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSelected, setPickupSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehichlePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver] = useState(false);

  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(() =>
    navigator.geolocation
      ? ""
      : "Geolocation is not supported by this browser.",
  );
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null); 
  const { user } = useContext(UserDataContext);
  const {socket} = useContext(SocketContext);

  useEffect(() => {
    console.log(user)
    // Only send join when we have a valid user id
    if (socket && user?._id) {
      socket.emit('join', { userType: "user", userId: user._id });
    }
  }, [socket, user]);

  // Updates the pickup text and fetches matching location suggestions.
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setPickupSelected(false);

    if (value.trim().length < 2) {
      setPickupSuggestion([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setPickupSuggestion(
        Array.isArray(response.data?.data) ? response.data.data : [],
      );
    } catch (error) {
      console.error(error);
      setPickupSuggestion([]);
    }
  };

  // Updates the destination text and fetches matching location suggestions.
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setDestinationSelected(false);

    if (value.trim().length < 2) {
      setDestinationSuggestion([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setDestinationSuggestion(
        Array.isArray(response.data?.data) ? response.data.data : [],
      );
    } catch (error) {
      console.error(error);
      setDestinationSuggestion([]);
    }
  };

  // Applies a selected suggestion to whichever location field is active.
  const handleLocationSelect = (location) => {
    if (activeField === "pickup") {
      setPickup(location.name);
      setPickupSelected(true);
      setPickupSuggestion([]);
      setActiveField("destination");
      return;
    }

    setDestination(location.name);
    setDestinationSelected(true);
    setDestinationSuggestion([]);
  };

  // Closes location search and opens vehicle selection when both places are set.
  async function handleFindTrip() {
    if (!pickupSelected || !destinationSelected) return;

    setPanelOpen(false);
    setVehiclePanel(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setFare(response.data);
    } catch (error) {
      console.error("Unable to calculate fare:", error);
      setFare({});
    }
  }

  // Prevents the location form from refreshing the page when submitted.
  const submitHandler = (e) => {
    e.preventDefault();
  };

  // Animates the location suggestions panel when it opens or closes.
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "75%",
          padding: 25,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen],
  );

  // Slides the vehicle selection panel into or out of view.
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehichlePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehichlePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel],
  );

  // Slides the ride confirmation panel into or out of view.
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel],
  );

  // Slides the driver-search panel into or out of view.
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound],
  );

  // Slides the waiting-for-driver panel into or out of view.
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  // Watches the browser's geolocation and keeps the current position updated.
  useEffect(() => {
    if (!navigator.geolocation) {
      return undefined;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setLocationError("");
      },
      (error) => {
        setLocationError(error.message || "Unable to access your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    console.log(response.data);
  }

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={currentPosition ?? fallbackPosition}
        zoom={16}
        style={{
          height: "100%",
          width: "100%",
        }}
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
              fillColor: "#2563eb",
              fillOpacity: 1,
              weight: 3,
            }}
          >
            <Popup>Your current location</Popup>
          </CircleMarker>
        )}
      </MapContainer>
      {locationError && (
        <p className="absolute left-1/2 top-4 z-[1000] -translate-x-1/2 rounded-lg bg-white px-4 py-2 text-sm shadow">
          {locationError}
        </p>
      )}
      <div className="absolute top-0 z-[500] flex h-screen w-full flex-col justify-end pointer-events-none">
        <div className="relative h-[25%] bg-white p-5 pointer-events-auto">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            class="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 class="text-36+xl font-semibold text-center">
            {" "}
            Plan Your Journey{" "}
          </h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div class="line absolute h-18 w-1.5 top-23 left-10 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-lg mt-5 w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] px-12 py-2 text-lg w-full mt-4"
              type="text"
              placeholder="Enter Your Drop Location"
            />
            {destinationSelected && (
              <button
                type="button"
                onClick={handleFindTrip}
                className="mt-3 w-full rounded-lg bg-black px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Find Trip
              </button>
            )}
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-gray-100 pointer-events-auto">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestion
                : destinationSuggestion
            }
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>
      <div
        ref={vehichlePanelRef}
        className="fixed bottom-0 z-[1100] w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        fare={fare}
        createRide={createRide}
        className="fixed bottom-0 z-[1100] w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRide
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        passenger={passenger}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        
        className="fixed bottom-0 z-[1100] w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <LookingForDriver 
        fare={fare}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        createRide={createRide}
        setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 z-[1100] w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
