const vehicleDetails = {
  car: {
    name: "Uber Go",
    seats: 4,
    description: "Affordable, compact rides",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAo7i4V_kcDsstDp4wwb5JSRSmq9bOStwjbw&s",
  },
  motorcycle: {
    name: "Uber Bike",
    seats: 1,
    description: "Easy and less price ride",
    image:
      "https://media.zigcdn.com/media/model/2026/Jan/yamaha-xsr-155-01-right-side-view_360x240.jpg",
  },
  auto: {
    name: "Uber Auto",
    seats: 3,
    description: "Electric, fast and compact",
    image:
      "https://img.autocarpro.in/autocarpro/aabd74c5-9869-4c6b-a867-5150f8246268_WhatsApp-Image-20260212-at-2.33.53PM.jpeg?w=750&h=490&q=75&c=1",
  },
};

const ConfirmRide = (props) => {
  const selectedVehicle = vehicleDetails[props.vehicleType] ?? vehicleDetails.car;

  return (
    <div>
        <h5
        onClick={() =>   props.setConfirmRidePanel(false)}
        class="text-center text-2xl w-100% absolute p-1 top-0 mx-45">
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
      <h3 class="text-2xl mb-5 font-medium text-center">
        Confirm Your Ride
      </h3>
      <div class = "flex flex-col justify-between items-center">
         <img class="h-20 mb-3 mt-3 object-contain" src={selectedVehicle.image} alt={selectedVehicle.name} />
         <div class="mb-2 text-center">
            <h4 class="text-lg font-semibold">
                {selectedVehicle.name} <span class="text-sm font-medium"><i class="ri-user-line"></i>{selectedVehicle.seats}</span>
            </h4>
            <p class="text-sm text-gray-600">{selectedVehicle.description}</p>
         </div>
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
         <button onClick = {() => {
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false)
            props.createRide()
         }}   class ="w-full mt-5 bg-amber-300 text-black font-semibold rounded-lgp p-2">Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmRide
