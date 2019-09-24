const mongoose = require("mongoose")
const Products = require("../models/products");

//-- Get all products
exports.get_all_products = (req, res, next) => {
    Products.find()
        .exec()
        .then(response => {
            res.status(200).json({
                Data: {
                    product: response
                },
                isSuccess: true,
                Message: "",
                error_code: 0
            });
        })
        .catch(err => {
            console.log(err + "Get err");
            res.status(500).json({
                isSuccess: false,
                error_code: 101,
                message: "CATEGORY_NOT_FOUND_ERR"
            });
        });
}

//-- Add new Product
exports.add_product = (req, res, next) => {

    const date = new Date();
    let id = 1;
    const sec =
        date.getHours() +
        date.getMinutes() +
        date.getUTCSeconds() +
        date.getSeconds();



    Products.findOne()
        .select("productID")
        .sort("-productID")
        .exec()
        .then(result => {
            if (result.productID > 0) {
                id = result.productID + 1;
                const product = new Products({
                    _id: new mongoose.Types.ObjectId(),
                    productID: id,
                    name: req.body.name,
                    category: req.body.category,
                    city: req.body.city,
                    state: req.body.state,
                    village: req.body.village,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    installDate: req.body.installDate,
                    serviceDate: req.body.serviceDate,
                    serviceCount: req.body.serviceCount,
                    isActive: req.body.isActive
                });

                product.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            isSuccess: true,
                            message: "",
                            error_code: 0,
                            result: result
                        });
                    })
                    .catch(err => {
                        console.log(err + "POST CATEGORY ERROR");
                        res.status(500).json({
                            isSuccess: false,
                            message: err,
                            error_code: CATEGORY_NOT_FOUND
                        });
                    });
            } else {
                const product = new Products({
                    _id: new mongoose.Types.ObjectId(),
                    productID: 1,
                    name: req.body.name,
                    category: req.body.category,
                    city: req.body.city,
                    state: req.body.state,
                    village: req.body.village,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    installDate: req.body.installDate,
                    serviceDate: req.body.serviceDate,
                    serviceCount: req.body.serviceCount,
                    isActive: req.body.isActive
                });

                product.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            isSuccess: true,
                            message: "",
                            error_code: 0,
                            result: result
                        });
                    })
                    .catch(err => {
                        console.log(err + "POST CATEGORY ERROR");
                        res.status(500).json({
                            isSuccess: false,
                            message: err,
                            error_code: CATEGORY_NOT_FOUND
                        });
                    });
            }
        }

        )
        .catch(err => {

            const product = new Products({
                _id: new mongoose.Types.ObjectId(),
                productID: 1,
                name: req.body.name,
                category: req.body.category,
                city: req.body.city,
                state: req.body.state,
                village: req.body.village,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                installDate: req.body.installDate,
                serviceDate: req.body.serviceDate,
                serviceCount: req.body.serviceCount,
                isActive: req.body.isActive
            });

            product.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        isSuccess: true,
                        message: "",
                        error_code: 0,
                        result: result
                    });
                })
                .catch(err => {
                    console.log(err + "POST CATEGORY ERROR");
                    res.status(500).json({
                        isSuccess: false,
                        message: err,
                        error_code: CATEGORY_NOT_FOUND
                    });
                });
        });




}