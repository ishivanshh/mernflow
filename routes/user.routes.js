const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller.js");




router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min : 3}).withMessage("First Name must be more than 3 character long"),
    body("password").isLength({min : 6}).withMessage("Password must be greater than 3 character")
],
    userController.registerUser

);


module.exports = router;
