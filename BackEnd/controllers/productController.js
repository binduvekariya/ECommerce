const Products = require('../Model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const ApiFeatures = require('../utils/apiFeatures');

// Create Product -- Admin
exports.createProducts = catchAsyncErrors(

    async (req, res, next) => {

        req.body.user = req.user.id;

        const product = await Products.create(req.body);

        res.status(200).json({ success: true, product });
    }
);


// Get All Products
exports.getAllProducts = catchAsyncErrors(

    async (req, res) => {

        const resultPerPage = 5;
        const productCount = await Products.countDocuments();

        const apifeature = new ApiFeatures(Products.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

        const getproduct = await apifeature.query;

        res.status(200).json({ success: true, getproduct, productCount});
    }
)


// Get product details
exports.getProductDetails = catchAsyncErrors(

    async (req, res, next) => {

        const product = await Products.findById(req.param.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({ success: true, product})
    }
)



// Update Products -- Admin
exports.updateProducts = catchAsyncErrors(

    async (req, res, next) => {

        let product = await Products.findById(req.param.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        product = await Products.findByIdAndUpdate(req.param.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

        res.status(200).json({ success: true, product })
    }
)


// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(

    async (req, res, next) => {

        const product = await Products.findById(req.param.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        await Products.remove();

        res.status(200).json({ success: true, message: "Product deleted successfully" })
    }
)