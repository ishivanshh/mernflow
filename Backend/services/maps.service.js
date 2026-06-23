const axios = require("axios");
const captainModel = require("../models/captain.model.js");

module.exports.getAddressCoordinate = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.OPENROUTESERVICE_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTESERVICE_API_KEY missing");
  }

  try {
    const response = await axios.get(
      "https://api.openrouteservice.org/geocode/search",
      {
        params: {
          api_key: apiKey,
          text: address,
          size: 1,
        },
      }
    );

    const features = response.data.features;

    if (!features || features.length === 0) {
      throw new Error("Location not found");
    }

    const result = features[0];

    const [lon, lat] = result.geometry.coordinates;

    return {
      lat,
      lon,
      display_name:
        result.properties.label ||
        result.properties.name ||
        address,
    };
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    throw new Error(
      "Failed to fetch coordinates"
    );
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const apiKey = process.env.OPENROUTESERVICE_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTESERVICE_API_KEY missing");
  }

  try {
    const originLocation =
      await module.exports.getAddressCoordinate(origin);

    const destinationLocation =
      await module.exports.getAddressCoordinate(destination);

    const coordinates = [
      [originLocation.lon, originLocation.lat],
      [destinationLocation.lon, destinationLocation.lat],
    ];

    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates,
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const feature = response.data.features?.[0];

    if (!feature) {
      throw new Error("Route not found");
    }

    const summary = feature.properties.summary;

    return {
      origin: originLocation,
      destination: destinationLocation,

      distanceInMeters: summary.distance,
      distanceInKm: Number(
        (summary.distance / 1000).toFixed(2)
      ),
    };
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    throw new Error(
      "Failed to calculate distance and duration"
    );
  }
};

module.exports.getSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const apiKey = process.env.OPENROUTESERVICE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTESERVICE_API_KEY missing"
    );
  }

  try {
    const response = await axios.get(
      "https://api.openrouteservice.org/geocode/autocomplete",
      {
        params: {
          api_key: apiKey,
          text: input,
          size: 5,
        },
      }
    );

    const features =
      response.data.features || [];

    return features.map((feature) => ({
      name:
        feature.properties.label ||
        feature.properties.name,
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
    }));
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    throw new Error(
      "Failed to fetch suggestions"
    );
  }
};

module.exports.getCaptainInTheRaidus = async (lat , lon , raidus) => {
  if (lat == null || lon == null || !raidus) {
    throw new Error("Latitude, longitude and radius are required");
  }

  // radius in km
  const captains = await captainModel.find({
    location : {
      $geoWithin : {
        $centerSphere : [ [ lon , lat ] , raidus / 6371]
      }
    }
  })
    .select("_id fullname email socketId status vehicle location")
    .lean();

  return captains;
};
