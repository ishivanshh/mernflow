const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller.js");



router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min : 3}).withMessage("first name must be at least characters long"),
    body("password").isLength({ min : 6}).withMessage("Password must be at least 6 character long"),
    body("vehicle.color").isLength({ min : 3}).withMessage("color must be at least 3 character long"),
    body("vehicle.plate").isLength({ min : 3}).withMessage("plate must be at least 3 character long"),
    body("vehicle.capacity").isInt({ min : 3}).withMessage("capacity must be at least 1"),
    body("vehicle.vehicleType").isIn([ "car" , "motorcycle" , "auto" ]).withMessage("Invalid")

],
    captainController.registerCaptain

)

module.exports = router;

