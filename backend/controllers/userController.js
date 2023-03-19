const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("validator")
require('dotenv').config()



function createToken(_id){
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

async function signUp(req,res){
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({Error: "All fields must be filled"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({Error: "Email is not valid"})
    }

    if(!validator.isStrongPassword(password)){
        return res.status(400).json({Error: "Password is not strong enough"})
    }

    try {
        
        const userAlreadyExist = await Users.findOne({email})
        
        if(userAlreadyExist){
            return res.status(400).json({Error: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const addedUser = await Users.create({email, password: hashedPassword})

        const token = createToken(addedUser._id)

        res.status(200).json({email, token})


    } catch (error) {
        res.status(400).json({Error: error.message})
    }


}


async function login(req,res){
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({Error: "All fields must be filled"})
    }

    try {
        const user= await Users.findOne({email})

        if(!user){
            return res.status(400).json({Error: "Incorrect email"})
        }

        const passwordMatched = await bcrypt.compare(password, user.password)
 

        if(!passwordMatched){
            return res.status(400).json({Error: "Incorrect password"})
        }

        const token = createToken(user._id)

        res.status(200).json({email, token})


    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}



module.exports = {signUp, login}