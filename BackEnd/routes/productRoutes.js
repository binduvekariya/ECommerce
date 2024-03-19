const Router = require('express');
const {getAllProducts, createProducts, updateProducts, deleteProduct, getProductDetails} = require("../controllers/productController");



const router = Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProducts);
router.route("/product/:id").put(updateProducts);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;