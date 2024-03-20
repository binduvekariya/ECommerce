const Router = require('express');
const {getAllProducts, createProducts, updateProducts, deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require('../Middleware/auth');


const router = Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthUser, authorizeRoles("admin"), createProducts);
router.route("/product/:id").put(isAuthUser, authorizeRoles("admin"), updateProducts);
router.route("/product/:id").delete(isAuthUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;