const blacklistTokenModel = require("../models/blacklistToken.model.js");
const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.services.js");
const { validationResult } = require("express-validator");


module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    };

    const {fullname, email , password , vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({  email });

    if(isCaptainAlreadyExist){
        return res.status(409).json("Captain with this email address already exists")
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

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async(req , res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400)
                  .json({errors : errors.array()});
    }

    const {email , password} = req.body;

    // as default it is given password {select : false} means it will not give password if asked
    const captain = await captainModel.findOne({email}).select("+password")  
    // but we want to check thats why +password ensures to get you password

    if(!captain){
        return res.status(401).json({message :" Invalid email or passowrd"})
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message : " Invalid email or password"})
    }
    const token = captain.generateAuthToken();
    res.cookie("token" , token)

    res.status(200).json({token , captain });
};

module.exports.getCaptainProfile = async(req , res , next) => {
     res
        .status(200)
        .json(req.captain);
};

module.exports.logoutCaptain = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if(!isBlacklisted){
        await blacklistTokenModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({message : "logout successfully!!"});
}