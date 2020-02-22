const mongoose = require("mongoose")
const Products = require("../models/products");
const ProductList = require("../models/productlist")

//-- Get all products
exports.get_all_products = (req, res, next) => {
    Products.find()
        .exec()
        .then(response => {
            console.log(JSON.stringify(response))
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
                    projectName: req.body.projectName,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    installDate: req.body.installDate,
                    serviceDate: req.body.serviceDate,
                    serviceCount: req.body.serviceCount,
                    isActive: req.body.isActive,
                    installedBy: req.body.installedBy,
                    notes: [{
                        empName: req.body.empName,
                        remark: req.body.notedata
                    }]
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
                    productID: id,
                    name: req.body.name,
                    category: req.body.category,
                    city: req.body.city,
                    state: req.body.state,
                    projectName: req.body.projectName,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    installDate: req.body.installDate,
                    serviceDate: req.body.serviceDate,
                    serviceCount: req.body.serviceCount,
                    isActive: req.body.isActive,
                    installedBy: req.body.installedBy,
                    notes: [{
                        empName: req.body.empName,
                        remark: req.body.notedata
                    }]
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
                            error_code: 101
                        });
                    });
            }
        }

        )
        .catch(err => {

            const product = new Products({
                _id: new mongoose.Types.ObjectId(),
                productID: 455545454545,
                name: req.body.name,
                category: req.body.category,
                city: req.body.city,
                state: req.body.state,
                projectName: req.body.projectName,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                installDate: req.body.installDate,
                serviceDate: req.body.serviceDate,
                serviceCount: req.body.serviceCount,
                isActive: req.body.isActive,
                installedBy: req.body.installedBy,
                notes: [{
                    empName: req.body.empName,
                    remark: req.body.notedata
                }]
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
                        error_code: 101
                    });
                });
        });

}

//-- To update product
exports.update_product = (req, res, next) => {
    const pID = req.params.productID;

    const userviceCount = req.body.serviceCount;
    const uisActive = req.body.isActive;
    const userviceDate = req.body.serviceDate;
    const uempName = req.body.empName;
    const uremark = req.body.notedata;


    var query = Products.findOne({
        productID: pID
    });

    query
        .exec()
        .then(product => {
            // product.serviceCount = userviceCount
            if (uisActive != null) {
                product.isActive = uisActive
            }
            if (userviceCount != null) {
                product.serviceCount = userviceCount
            }
            if (userviceDate != null) {
                product.serviceDate = userviceDate
            }
            if (uempName != null && uremark != null) {

                product.serviceDate = req.body.serviceDate,
                    product.notes.push({
                        empName: req.body.empName,
                        remark: req.body.notedata,
                        date: req.body.serviceDate
                    })

            }
            return product.save();
        })
        .then(data => {
            res.status(200).json({
                isSuccess: true,
                ErrorCode: 0,
                message: "Product detail is updated"
            });
        })
        .catch(err => {
            console.log(err + "POST CATEGORY ERROR");
            res.status(500).json({
                isSuccess: false,
                message: err,
                error_code: 101
            });
        })

}

//-- To get specific product form product list
exports.get_product = (req, res, next) => {
    const id = req.params.productID;

    var query = Products.findOne({
        productID: id
    });

    query
        .exec()
        .then(response => {
            if (response) {
                res.status(200).json({
                    Data: {
                        product: response
                    },
                    isSuccess: true,
                    ErrorCode: 0,
                    message: ""
                });
            } else {
                return res.status(200).json({
                    isSuccess: false,
                    ErrorCode: 11,
                    message: "No Product available"
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                isSuccess: false,
                ErrorCode: 11,
                message: "No Product available"
            });
        })

}