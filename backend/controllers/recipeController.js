const RecipeModel = require("../models/RecipeModel")


async function addRecipe(req,res){
    const {name,category,image,price} = req.body

    if(!name || !category || !image || !price){
        return res.status(400).json({Error: "All fields must be filled"})
    }

    try {
        const user_id = req.user._id
        const addedRecipe = await RecipeModel.create({name,category,image,price,user_id})

        res.status(200).json(addedRecipe)
    } catch (error) {
        res.status(400).json({Error: error.message}) 
    }
}

async function getRecipes(req,res){

    
    const user_id = req.user._id

    try {
        const recipes = await RecipeModel.find({user_id})
        
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}

async function removeRecipe(req,res){
    const {id} = req.params

    try {
        const removedRecipe = await RecipeModel.findByIdAndDelete(id)
         
        res.status(200).json(removedRecipe)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


async function editRecipe(req,res){
    const {name, category, price} = req.body
    const {id} = req.params

    try {
        
        const editedRecipe = await RecipeModel.findByIdAndUpdate(id, {name, category, price})

        res.status(200).json(editedRecipe)

    } catch (error) {
        res.status(400).json({Error: error.message})
    }

}



module.exports = {addRecipe, getRecipes, removeRecipe, editRecipe}