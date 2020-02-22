const mongoose = require("mongoose");
let mongooseHidden = require("mongoose-hidden")();

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productID: { type: Number, index: true, unique: true },
    name: { type: String, require: true },
    category: { type: String, require: true },
    city: { type: String, require: false },
    state: { type: String, require: false },
    projectName: { type: String, require: false },
    country: { type: String, require: false },
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    installDate: { type: String, default: Date.now },
    serviceCount: { type: Number, require: false },
    isActive: { type: Boolean, require: true, default: false },
    installedBy: { type: String },
})


productSchema.plugin(mongooseHidden, {
    hidden: { __v: true }
});


module.exports = mongoose.model('ProductList', productSchema);