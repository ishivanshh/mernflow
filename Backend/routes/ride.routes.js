const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const rideController = require("../controllers/ride.controller.js");



router.post('/create', 
    body('userId').isString().isLength({ min : 24, max : 24}).withMessage("invalid user id"),
    body('pickup').isString().isLength({ min : 3}).withMessage("invalid pickup address"),
    body('destination').isString().isLength({ min : 3}).withMessage("invalid destination address"),
    body('vehicleType').isString(),isIn(['auto', 'car' , 'motorcycle']).withMessage('invalid vehicle type'),
    rideController.createRide
)


module.exports = router;