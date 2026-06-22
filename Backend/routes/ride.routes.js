const express = require('express');
const router = express.Router();
const {check , query } = require("express-validator");
const rideController = require("../controllers/ride.controller.js");
const authMiddleware = require('../middlewares/auth.middleware.js');


router.post('/create',
    authMiddleware.authUser,
    check('pickup')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('pickup is required')
      .bail()
      .isString()
      .withMessage('pickup must be a string')
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage('invalid pickup address'),
    check('destination')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('destination is required')
      .bail()
      .isString()
      .withMessage('destination must be a string')
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage('invalid destination address'),
    check('vehicleType')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('vehicleType is required')
      .bail()
      .isString()
      .withMessage('vehicleType must be a string')
      .bail()
      .trim()
      .isIn(['auto', 'car', 'motorcycle'])
      .withMessage('invalid vehicle type'),
    rideController.createRide
);

router.get('/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({min : 3}).withMessage('Invalid Pickup location'),
  query('destination').isString().isLength({min : 3}).withMessage('Invalid destination'),
  rideController.getFare
)

module.exports = router;