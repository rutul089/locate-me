
const express = require('express');
const productRoute = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth")
const productController = require("../controller/product.controller");


//-- Get all products
productRoute.get('/', checkAuth, productController.get_all_products)

//-- Add new product
productRoute.post('/', checkAuth, productController.add_product)

//-- fetching sigle product , dlete product , edit product pending 
productRoute.get("/:productID", checkAuth, productController.get_product)

//-- update product from product id 
productRoute.post('/updatProduct/:productID', checkAuth, productController.update_product)
module.exports = productRoute;