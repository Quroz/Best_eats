const Cart = require("../models/cartModel")


async function getCart(req,res){

    const user_id = req.user._id

    try {

        const cartItems = await Cart.find({user_id})

        const totalPrice = await Cart.aggregate([
            {
              $match: {
                user_id: user_id.toString() 
              }
            },
            {
              $group: {
                _id: "$user_id",
                totalPrice: {
                  $sum: "$price"
                }
              }
            }
          ]);

          res.status(200).json({cartItems, totalPrice})
        
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}

async function addCart(req,res){

    const {name, category, image,price} = req.body

    if(!name || !category || !image || !price){
        return res.status(200).json({Error: "All fields must be filled"})
    }

    try {
        
        const user_id = req.user._id
        const addedCart = await Cart.create({user_id,name, category, image,price})

        res.status(200).json(addedCart)

    } catch (error) {
        res.status(200).json({Error: error.message})
    }

}



async function deleteCart(req,res){

    const {id} = req.params

    try {
        
        const deletedCart = await Cart.findByIdAndDelete(id)
        res.status(200).json(deletedCart)

    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


async function deleteDb(req,res){
    try {
        
        const deletedCart = await Cart.deleteMany({})
        res.status(200).json(deletedCart)

    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}


module.exports = {getCart, addCart, deleteCart, deleteDb}