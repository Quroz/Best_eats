const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {timestamps: true})

const CartModel = mongoose.model("Cart", CartSchema)

module.exports = CartModel