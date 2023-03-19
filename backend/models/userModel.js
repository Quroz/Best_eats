const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const UserModel = mongoose.model("UserBurger", UserSchema)

module.exports = UserModel