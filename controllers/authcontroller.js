//import
const express = require('express')
const {User,register,Login} = require('../models/Users')
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//middleware
const router = express()


//Register
/**----------------------
 * @route api/auth/register
 * @access public
 * @description making a new account
 * @method POST
 ------------------------*/
const registerpost = asynchandler(async (req,res) => {
// 1- validation    
const {error} = register(req.body)
if(error){
    res.status(200).json({message:error.details[0].message})
}
// 2- sending information
const user = new User({
Email : req.body.Email,
Password : req.body.Password,
Username : req.body.Username,
})
const result = await user.save()

// 1.5- crypt password and gen token
const salt = await bcrypt.genSalt(10)
req.body.Password = await bcrypt.hash(req.body.Password,salt)
// 1.9 gen token
const token = jwt.sign({
id:user._id,
Username:user.Username,
isadmin:user.isadmin
},process.env.JWT_SECRET)

const {Password,...other} = result._doc
res.status(201).json({ ...other, token})

if(user.Username){
    res.status(400).json("ths name alreader regestred chooose another one")
}

})














//Login
const Loogin = asynchandler(async (req, res) => {
    const { error } = Login(req.body);
    if (error) {
        return res.status(500).json({ message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
        return res.status(404).json("invalid email or password");
    }

    // Compare passwords
    const isPassword = await bcrypt.compare(req.body.Password, user.Password);
    if (isPassword) {
        return res.status(404).json("invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id:user._id,
Username:user.Username,
isadmin:user.isadmin
        },
        process.env.JWT_SECRET
    );

    // Exclude password from response
    const { Password, ...other } = user._doc;

    res.status(200).json({ 
        ...other
        
        , token });
});
    
    
















module.exports = {registerpost,Loogin}