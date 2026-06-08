const blacklistTokenModel = require("../models/blacklistToken.model.js");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.services.js");
const {validationResult} = require("express-validator");

module.exports.registerUser = async (req , res , next) => {
    const errors = validationResult(req); 
    // we will got all the validation in user.routes if got anything error in any of them.
    
    if(!errors.isEmpty()){
        return 
        res.status(400)
        .json({errors : errors.array() }); // we will got error message in array
    };

    console.log(req.body);

    const {fullname, email , password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    
    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token , user});
}

module.exports.loginUser = async (req , res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400)
                  .json({errors : errors.array()});
    }

    const {email , password} = req.body;

    // as default it is given password {select : false} means it will not give password if asked
    const user = await userModel.findOne({email}).select("+password")  
    // but we want to check thats why +password ensures to get you password

    if(!user){
        return res.status(401).json({message :" Invalid email or passowrd"})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message : " Invalid email or password"})
    }
    const token = user.generateAuthToken();
    res.cookie("token" , token)

    res.status(200).json({token , user});
};

module.exports.getUserProfile = async (req, res, next) => {
    res
        .status(200)
        .json(req.user);
};

module.exports.logoutUser = async(req , res , next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.header.authorization.split(" ")[1];

    await blacklistTokenModel.create({token});
    
    res.status(200).json({message : "Logged Out!"})
}
