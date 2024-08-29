const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const userSignUpController = require("../controller/User/userSignUp");
const userSignInController = require("../controller/User/userSignIn");
const userDetailsController = require("../controller/User/userDetails");
const allUsers = require("../controller/User/allUsers");
const updateUser = require("../controller/User/updateUser");
const uploadProductController = require("../controller/Products/uploadProduct");
const getProductController = require("../controller/Products/getProduct");
const updateProductController = require("../controller/Products/updateProduct");
const userLogout = require("../controller/User/userLogout");
const getCategoryProduct = require("../controller/Products/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/Products/getCategoryWiseProduct");
const getProductDetails = require("../controller/Products/getProductDetails");
const addToCartController = require("../controller/User/addToCartController");
const countAddToCartProduct = require("../controller/User/countAddToCartProduct");
const addToCartViewProduct = require("../controller/User/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/User/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/User/deleteAddToCartProduct");
const searchProduct = require("../controller/Products/searchProduct");
const filterProductController = require("../controller/Products/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhook");
const orderController = require("../controller/order/orderController");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin api
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// User add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

// payments and orders
router.post('/checkout', authToken, paymentController)
router.post('/webhook', webhooks)  // /api/webhook
router.get('/order-list', authToken, orderController)

module.exports = router;
