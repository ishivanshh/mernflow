const rideService = require("../services/ride.services.js");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service.js");

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
    // console.log(pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainInTheRaidus(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      500,
    );
    //console.log(captainsInRadius);
    console.log("Nearby Captains:", captainsInRadius);
    console.log("Pickup:", pickupCoordinates);
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
