const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.services.js");
const {validationResult} = require("express-validator");


module.exports.registerCaptain = async (res , req , next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(200).json({ errors : errors.array()});
    };

    const {fullname, email , password , vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({  email });

    if(!isCaptainAlreadyExist){
        return res.status(200).json("Captain with this email address already exist")
    }
    
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPassword,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json(token , captain);
}
