const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setVehiclePanel(false)}
        class="text-center text-2xl w-100%"
      >
        <i class="ri-arrow-down-wide-fill text-black-300"></i>
      </h5>
      <h3 class="text-2xl px-4 pt-5 pb-3 font-medium">
        Choose your driving partner
      </h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('car')
        // props.setVehiclePanel(false)
      }} class="flex  hover:border-2 mt-4 rounded-xl w-full items-center justify-between">
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
        <h2 class="text-xl p-2 font-semibold">
         ₹{props.fare.car}
        </h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
         props.selectVehicle('motorcycle')
      }}  class="flex mt-4 hover:border-2 rounded-xl w-full items-center justify-between">
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
        <h2 class="text-xl p-2 font-semibold">
           ₹{props.fare.motorcycle}
        </h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
         props.selectVehicle('auto') 
      }}  class="flex hover:border-2 mt-4 rounded-xl w-full items-center justify-between">
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
        <h2 class="text-xl p-2 font-semibold">
           ₹{props.fare.auto }
        </h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
