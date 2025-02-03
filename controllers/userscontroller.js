//import
const express = require('express')
const {User,register,Login} = require('../models/Users')
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const {cloudinaryremove,cloudinaryupload} = require("../utils/cloudinary");
const { url } = require('inspector');
const fs = require('fs');
const { photoupload } = require('../middleware/photoupload');
//middleware
const router = express();

/**------------------
 * @method GET
 * @route /api/user
 * @description get all the accounts
 * @access private
 ---------------------*/
const getaccounts = asynchandler(async (req,res) => {
    try {
        const accounts = await User.find()
        res.status(200).json(accounts)
        console.log(req.headers.kalimboo)
    } catch (error) {
        res.status(500).json("error")
    }

 })


 /**------------------
 * @method GET
 * @route /api/user/:id
 * @description get profile info
 * @access private
 ---------------------*/

const getid = asynchandler(async (req,res ) => {
    const user = await User.findById(req.params.id).select("-Password");
    if(!user){
        res.status(500).json("user not found")
    }
    res.status(200).json(user)
 })

  /**------------------
 * @method POST
 * @route /api/user/profile-photo-upload
 * @description profile photo upload
 * @access private
 ---------------------*/

const postprofilephoto = asynchandler(async (req,res) => {
//1-validation
    if(!req.file){
        res.status(500).json("no photo provided")
    }
//2-path
const imagepath = path.join(__dirname,`../images/${req.file.filename}`)
//3-upload to cloudinar
const result = await cloudinaryupload(imagepath)
console.log(result.url)
//4-get the user from db
const user = await User.findById(req.user.id)
//5-delete profile photo if exist
if(user.profilephoto.publicid !== null){
    await cloudinaryremove(user.profilephoto.publicid)
}
//6-change photo feild in db
user.profilephoto ={
    url:result.secure_url,
    publicid:result.public_id
}
await user.save()
//7-response
    res.status(200).json({message:"has been sent",
    profilephoto: {url:result.secure_url,public_id:result.public_id}  }
    )
//8-delete from server
fs.unlinkSync(imagepath)    
})


module.exports = {postprofilephoto,getid,getaccounts}








  