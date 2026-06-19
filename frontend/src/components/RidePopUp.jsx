import React from 'react'

const RidePopUp = () => {
  return (
      <div>
        <h5
        onClick={() => props.setVehiclePanel(false)}
        class="text-center text-2xl w-100% absolute p-1 top-0 mx-55">
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
      <h3 class="text-2xl mb-5 font-medium text-center">
        New Ride Available
      </h3>
      <div class ="flex items-center justify-between">
        <div class ="flex items-center gap-3">
            <img class ="h-10 w-18 object-cover rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEouMzzrpU3iHAyGWzn_Ly8D7PwTLSF973sei9nCqgsQ&s=10" alt="" />
            <h2>Shivansh Saxena</h2>
        </div>
        <h5>2.2Km</h5>
      </div>
      <div class = "flex flex-col justify-between items-center">
         
         <div class= "w-full mt-5 ">
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h3 class="text-lg font-medium">Mamta Trader's</h3>
                <p class="text-sm -mt-1 text-gray-700">Brij Bihar Colony, Shahjahanpur</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-user-fill"></i>
            <div>
                <h3 class="text-lg font-medium">One 8 Resturant</h3>
                <p class="text-sm -mt-1 text-gray-700">Hauz khas ,North Delhi</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3">
                <i class="text-lg ri-wallet-2-fill"></i>
                <div>
                    <h3>$192.32</h3>
                    <p>Cash Cash</p>
                </div>
            </div>
         </div>
         <button onClick = {() => {
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false)
         }}   class ="w-full mt-5 bg-green-500 text-black font-semibold rounded-lgp p-2">Confirm</button>
         <button class ="w-full mt-3 bg-gray-300 text-gray-800 font-semibold rounded-lgp p-2">Ignore</button>
      </div>
    </div>
  )
}

export default RidePopUp
