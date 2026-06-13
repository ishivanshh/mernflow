import React, { useRef , useState } from 'react'
import firstMeetImage from '../assets/firstmeet.png'
import {useGSAP} from '@gsap/react';
import gsap from "gsap";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

  }
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "75%" : "0%",
    })
  }, { dependencies: [panelOpen] })


  return (
    <div class="h-screen relative">
        <img class = "w-16 absolute left-5 top-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEzKW4r4SmPFZ9NLQgincQ_Z2XBHD70su6Q&s" alt="logo" />
        <div class="h-screen w-screen">
          <img class ="h-full w-full object-cover" src={firstMeetImage} alt="First meet" />
        </div>
        <div class =" flex flex-col justify-end h-screen absolute top-0 w-full">
          <div class ="h-[25%] p-5 bg-white relative">
            <h4 class="text-3xl font-semibold text-center"> Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div class="line absolute h-18 w-1.5 top-23 left-10 bg-gray-900 rounded-full"></div>
            <input 
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=>{
              setPickup(e.target.value)
            }}
            class="bg-[#eee] px-12 py-2 text-lg mt-5 w-full" 
            type="text" 
            placeholder='Add a pick-up location'
            />
            <input
             value={destination}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            onClick={()=>{
              setPanelOpen(true)
            }}
            class="bg-[#eee] px-12 py-2 text-lg w-full mt-4" type="text" placeholder='Enter Your Drop Location'/>
          </form>
          </div>
          <div ref ={panelRef} class="bg-red-500 h-[0%]">
          </div>
        </div>
    </div>
  )
}

export default Home