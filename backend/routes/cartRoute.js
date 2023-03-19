const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const {addCart, getCart, deleteCart, deleteDb} = require("../controllers/cartController")


router.use(requireAuth)

router.get("/", getCart)
router.delete("/:id", deleteCart)
router.delete("/", deleteDb)
router.post("/", addCart)

module.exports = router