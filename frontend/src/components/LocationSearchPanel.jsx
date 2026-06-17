import React from 'react'

const LocationSearchPanel = (props) => {
  const locations = [
    "18, Krishna bhavan , Near Mamta Traders , Shahjahanpur , UP",
    "takshasila Public school , Near HP gas agency , Shahjahnpur, UP",
    "galli no. 12 , backbenchers cafe , near punjab national bank",
    "shekhar hospital near vishal mega mart anta chahura , shahjahanpur" 
  ]
  return (
    <div>
       {
        locations.map(function(elem , idx){
          return  <div key={idx} onClick={() => {
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }} className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-4 justify-center ">
            <h2 className="h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-2-fill h-10"></i></h2>
            <h5 className="bg-[#eee] font-medium">{elem}</h5>
        </div>
        })
       }
    </div>
  )
}

export default LocationSearchPanel


