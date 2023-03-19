const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
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
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
}, {timestamps: true})

const RecipeModel = mongoose.model("Recipe", RecipeSchema)

module.exports = RecipeModel