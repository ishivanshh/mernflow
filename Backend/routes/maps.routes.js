const express = require("express");
const router = express.Router();

const {
  query,
} = require("express-validator");

const mapController = require(
  "../controllers/maps.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

router.get(
  "/get-coordinates",

  query("address")
    .isString()
    .trim()
    .isLength({ min: 3 }),

  authMiddleware.authUser,

  mapController.getCoordinates
);
router.get(
  "/get-distance-time",

  query("origin")
    .isString()
    .trim()
    .isLength({ min: 3 }),

  query("destination")
    .isString()
    .trim()
    .isLength({ min: 3 }),

  authMiddleware.authUser,

  mapController.getDistanceTime
);
router.get(
  "/get-suggestions",

  query("input")
    .isString()
    .trim()
    .isLength({ min: 2 }),

  authMiddleware.authUser,

  mapController.getSuggestions
);

module.exports = router;