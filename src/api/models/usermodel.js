const mongoose = require("mongoose");
let mongooseHidden = require("mongoose-hidden")();

const userSchema = mongoose.Schema(
    {
        
        userID: { type: Number, index: true, unique: true, default: 1 },
        userName: { type: String, required: true },
        userEmail: {
            type: String,
            required: false,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        userPassword: { type: String, required: true },
        userRole: { type: Number, required: true }
    },
    {
        versionKey: false
    }
)
userSchema.plugin(mongooseHidden, {
    hidden: { _id: true, userPassword: true }
  });

module.exports = mongoose.model("Users", userSchema)