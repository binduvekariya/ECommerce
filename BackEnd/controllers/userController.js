const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/UserModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require('../Middleware/catchAsyncError');

// Register a User
exports.registerUser = catchAsyncErrors ( async(req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create( {
        name, email, password,
        avatar: {
            public_id: "This is a sample ID",
            url: "profilePicUrl"
        }
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors ( async (req, res, next) => {

    const {email, password} = req.body;

    // Checking if user has given password and email both
    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const idPasswordMatched = user.comparePassword(password);

    if(!idPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logOutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly : true
    })



    res.status(200).json ({
            
        success : true,
        message : "logged Out Successfully"
       
    })
})
