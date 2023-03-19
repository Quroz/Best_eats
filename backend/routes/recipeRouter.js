const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const {addRecipe, getRecipes, removeRecipe, editRecipe} = require("../controllers/recipeController")

router.use(requireAuth)

router.post("/", addRecipe)
router.get("/", getRecipes)
router.delete("/:id", removeRecipe)
router.put("/:id", editRecipe)


module.exports = router