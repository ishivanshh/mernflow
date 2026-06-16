import React, { useRef, useState } from "react";
import firstMeetImage from "../assets/firstmeet.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehichlePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
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

  return (
    <div class="h-screen relative overflow-hidden">
      <img
        class="w-16 absolute left-5 top-7"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEzKW4r4SmPFZ9NLQgincQ_Z2XBHD70su6Q&s"
        alt="logo"
      />
      <div class="h-screen w-screen">
        <img
          class="h-full w-full object-cover"
          src={firstMeetImage}
          alt="First meet"
        />
      </div>
      <div class=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div class="h-[25%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            class="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 class="text-3xl font-semibold text-center"> Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div class="line absolute h-18 w-1.5 top-23 left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              class="bg-[#eee] px-12 py-2 text-lg mt-5 w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              class="bg-[#eee] px-12 py-2 text-lg w-full mt-4"
              type="text"
              placeholder="Enter Your Drop Location"
            />
          </form>
        </div>
        <div ref={panelRef} class="bg-gray-100 h-[0%]">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehichlePanelRef}
        class="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-5 w-full"
      >
        <h3 class = "text-2xl px-4 pb-3 font-medium">Choose your driving partner</h3>
        <div class="flex  hover:border-2 mt-4 rounded-xl w-full items-center justify-between">
          <img
            class="h-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAo7i4V_kcDsstDp4wwb5JSRSmq9bOStwjbw&s"
            alt=""
          />
          <div class="w-1/2">
            <h4 class="font-medium">
              Uber Go{" "}
              <span>
                <i class="ri-user-line"></i>4
              </span>
            </h4>
            <h6>2 mins away </h6>
            <p>Affordable , compact rides</p>
          </div>
          <h2 class="text-xl p-2 font-semibold">$198.54</h2>
        </div>
        <div class="flex mt-4 hover:border-2 rounded-xl w-full items-center justify-between">
          <img
            class="h-13"
            src="https://media.zigcdn.com/media/model/2026/Jan/yamaha-xsr-155-01-right-side-view_360x240.jpg"
            alt=""
          />
          <div class="w-1/2">
            <h4 class="font-medium">
              Uber Bike
              <span>
                <i class="ri-user-line"></i>1
              </span>
            </h4>
            <h6>5 mins away </h6>
            <p>Easy and Less price ride</p>
          </div>
          <h2 class="text-xl p-2 font-semibold">$69.32</h2>
        </div>
        <div class="flex hover:border-2 mt-4 rounded-xl w-full items-center justify-between">
          <img
            class="h-13"
            src="https://img.autocarpro.in/autocarpro/aabd74c5-9869-4c6b-a867-5150f8246268_WhatsApp-Image-20260212-at-2.33.53PM.jpeg?w=750&h=490&q=75&c=1"
            alt=""
          />
          <div class="w-1/2">
            <h4 class="font-medium">
              Uber Auto
              <span>
                <i class="ri-user-line"></i>3
              </span>
            </h4>
            <h6>10 mins away</h6>
            <p>Electirc , Fast and compact</p>
          </div>
          <h2 class="text-xl p-2 font-semibold">$121.26</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
