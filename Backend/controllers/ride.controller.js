const rideService = require("../services/ride.services.js");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service.js");
const {sendMessageToSocketId} = require('../socket.js');
const rideModels = require("../models/ride.models.js");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.body.userId;
  const pickup = req.body.pickup || req.query.pickup;
  const destination = req.body.destination || req.query.destination;
  const vehicleType = req.body.vehicleType || req.query.vehicleType;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // After creating the ride, gather additional data (coordinates and nearby captains).
    // Do all async work first, then send a single response to avoid headers-sent errors.
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    console.log("Pickup:", pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainInTheRaidus(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      500,
    );

    ride.otp = ""
    const rideWithUser = await rideModels.findById(ride._id).populate('user');

    captainsInRadius.map(async captain => {
      sendMessageToSocketId(captain.socketId, {
        event : 'new-ride',
        data : rideWithUser
      })
    });

    
    // Emit socket event to captains here (example placeholder)

    return res.status(201).json({ ride, pickupCoordinates, captainsInRadius });
  } catch(err){
    console.error(err);
    return res.status(400).json({
        message: err.message
    })
}
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(201).json(fare);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.confirmRide = async(req , res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({rideId, captain : req.captain});

   
    sendMessageToSocketId(ride.user.socketId, {
        event : 'ride-confirmed',
        data : ride
      });

    return res.status(200).json(ride);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message : err.message });
  }
}

module.exports.startRide = async( req , res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});

  }

  const { rideId , otp } = req.query;

  try {
    const ride = await rideService.startRide({ rideId, otp, captain : req.captain});

    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-started',
      data : ride
    })
    return res.status(200).json(ride)
  } catch (err) {
    return res.status(500).json({message : err.message });
  }
}

module.exports.endRide = async( req , res ) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({rideId , captain : req.captain})
    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-ended',
      data : ride
    })
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message : err.message });
  }
}