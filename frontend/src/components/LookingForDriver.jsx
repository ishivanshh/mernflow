import React from 'react'

const LookingForDriver = (props) => {
  return (
   <div>
        <h5
        onClick={() => props.setVehicleFound(false)}
        class="text-center text-2xl w-100% absolute p-1 top-0 mx-55">
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
      <h3 class="text-2xl mb-5 font-medium text-center">
        Looking for Drivers
      </h3>
      <div class = "flex flex-col justify-between items-center">
         <img class="h-20 mb-5 mt-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAo7i4V_kcDsstDp4wwb5JSRSmq9bOStwjbw&s" alt="car" />
         <div class= "w-full mt-5 ">
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-2-fill"></i>
            <div>
    
                <p class="text-lg -mt-1 text-gray-700">{props.pickup}</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-user-fill"></i>
            <div>
                
                <p class="text-lg -mt-1 text-gray-700">{props.destination}</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3">
                <i class="text-lg ri-wallet-2-fill"></i>
                <div>
                    <h3>₹{props.fare[props.vehicleType]}</h3>
                    <p>Cash Cash</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default LookingForDriver
