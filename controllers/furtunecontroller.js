const express = require('express')
const {validate,validateupdate,Furtune} = require('../models/Furtune')
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const {cloudinaryremove,cloudinaryupload} = require("../utils/cloudinary");
const { url } = require('inspector');
const fs = require('fs')

/**------------------
 * @method GET
 * @route /api/Furtunes
 * @description get all Furtunes
 * @access private
 ---------------------*/
 const getfur = asynchandler(async (req, res) => {
    const price = req.query.price; 
    const name = req.query.name;
    const catigory = req.query.catigory
    try {
        if (price) {
            const furtune = await Furtune.find({ prix: { $eq: parseInt(price) } });
            return res.status(200).json(furtune);
        } else if (name) {
            const furtune = await Furtune.find({
                name: { $regex: new RegExp(name, 'i') }  // Using regular expression with 'i' for case-insensitive search
            });
            return res.status(200).json(furtune);
        } else if (catigory) {
            const furtune = await Furtune.find({
                catigory: { $regex: new RegExp(catigory, 'i') }  // Using regular expression with 'i' for case-insensitive search
            });
            return res.status(200).json(furtune);
        }else {
            const furtune = await Furtune.find();
            return res.status(200).json(furtune);
        }
    } catch (error) {
        res.status(500).json({messgae:`error ${error}`});
    }
});

 /**------------------
 * @method GET
 * @route /api/Furtunes/:id
 * @description get Furtune by id
 * @access private
 ---------------------*/

 const getfurid = asynchandler(async(req,res) => {
    try {
        const furtune = await Furtune.findById(req.params.id)
        res.status(200).json(furtune)
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 /**------------------
 * @method POST
 * @route /api/Furtunes
 * @description POST NEW FURTUNE
 * @access private
 ---------------------*/
 const postfur = asynchandler(async (req,res) => {
 const { error } = validate(req.body);
if(error){
    res.status(500).json({message:error.details[0].message})
}
const furtune = new Furtune({
      catigory:req.body.catigory,
            name:req.body.name,
            type:req.body.type ,
            color:req.body.color ,  
            description:req.body.description,
            prix:req.body.prix
})
const result = await furtune.save()
res.status(200).json(furtune)
 })


 /**------------------
 * @method POST
 * @route /api/Furtunes/furtune-photo-upload/:id
 * @description furtune photo upload
 * @access private
 ---------------------*/
const postfurtunephoto = asynchandler(async (req,res) => {
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
    const furtune = await Furtune.findById(req.params.id)
    //5-delete profile photo if exist
    if(furtune.images.publicid !== null){
        await cloudinaryremove(furtune.images.publicid)
    }
    //6-change photo feild in db
    furtune.images ={
        url:result.secure_url,
        publicid:result.public_id
    }
    await furtune.save()
    //7-response
        res.status(200).json({message:"has been sent",
        profilephoto: {url:result.secure_url,public_id:result.public_id}  }
        )
    //8-delete from server
    fs.unlinkSync(imagepath)    
    })
    

 module.exports = {postfur,getfurid,getfur,postfurtunephoto}