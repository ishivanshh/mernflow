const userModel = require("../models/user.model.js");
const userService = require("../services/user.services.js");
const {validationResult} = require("express-validator");

module.exports.registerUser = async (req , res , next) => {
    const errors = validationResult(req); // we will got all the validation in user.routes if got anything error in any of them.
    
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