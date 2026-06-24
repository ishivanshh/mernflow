import React from 'react'

const RidePopUp = (props) => {
  return (
      <div>
        <h5
        onClick={() => props.setRidePopupPanel(false)}
        class="text-center text-2xl w-100% absolute p-1 top-0 mx-45">
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
      <h3 class="text-2xl mb-5 font-medium text-center">
        New Ride Available
      </h3>
      <div class ="flex items-center justify-between p-3 bg-yellow-500 rounded-xl mt-4">
        <div class ="flex items-center gap-3">
            <img class ="h-15 w-15 object-fit rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEouMzzrpU3iHAyGWzn_Ly8D7PwTLSF973sei9nCqgsQ&s=10" alt="" />
            <h2 class ="text-xl">{props.ride?.fullname.firstname + " " + props.ride?.fullname.lastname }</h2>
        </div>
        <h5 class = "text-lg font-semibold">2.2Km</h5>
      </div>
      <div class = "flex flex-col justify-between items-center">
         
         <div class= "w-full mt-5 ">
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-2-fill"></i>
            <div>
                <p class="text-lg -mt-1 text-gray-700">{props.ride?.pickup}</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3 border-b-2 border-gray-400">
                <i class="text-lg ri-map-pin-user-fill"></i>
            <div>
                <p class="text-sm -mt-1 text-gray-700">{props.ride?.destination}</p>
            </div>
            </div>
            <div class="flex items-center gap-5 p-3">
                <i class="text-lg ri-wallet-2-fill"></i>
                <div>
                    <h3>{props.ride?.fare}</h3>
                    <p>Cash Cash</p>
                </div>
            </div>
         </div>
         <button onClick = {() => {
          props.setConfirmRidePopup(true)
         }}   class ="w-full mt-5 bg-green-500 text-black font-semibold rounded-lgp p-2">Accept</button>
         <button onClick={() => {
          props.setRidePopupPanel(false)
         }} 
         class ="w-full mt-3 bg-gray-300 text-gray-800 font-semibold rounded-lgp p-2">Ignore</button>
      </div>
    </div>
  )
}

export default RidePopUp
