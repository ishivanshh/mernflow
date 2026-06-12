const userModel = require("../models/user.model.js");
const captainModel = require("../models/captain.model.js");
const blacklistTokenModel = require("../models/blacklistToken.model.js");
const jwt = require("jsonwebtoken");

module.exports.authUser = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message : "Unauthorized, not getting token"});
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if(isBlackListed){
        return res.status(401).json({message: "Unauthorized, token has been blacklisted"});
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();
    } catch (err){
        return res.status(401).json({message : "Unauthorized"})
    }
}

module.exports.authCaptain = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message : "unauthorization, not getting token"});
    }
    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if(isBlackListed){
        return res.status(401).json({message : "Unauthroized , token has been blacklisted"});
    }
    try {
        const decoded =jwt.verify(token , process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain;

        return next();
    } catch (err){
        
        return res.status(401).json({message : "Unauthorized"});
    }
}