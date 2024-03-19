const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/UserModel");

// Register a User

exports.registerUser = catchAsyncErrors ( async(req, res, next) => {
    
})