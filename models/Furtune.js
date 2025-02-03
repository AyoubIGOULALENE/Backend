const mongoose = require("mongoose");
const Joi = require("joi");
const joi = require("joi");

const furtuneschema = new mongoose.Schema({
catigory:{
    type:String,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true
},
name:{  type:String,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true},
type:{  type:Array,
        trim:true,
        minlength:3,
        maxlength:1000000,
        required:true},
color:{  type:Array,
            trim:true,
            minlength:3,
            maxlength:1000000,
            required:true},
Matières:{type:Array,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true},            
description:{  type:String,
                trim:true,
                minlength:3,
                maxlength:10000000000000000000000000000000000000000000000000000000000000000000,
                required:true}   ,
prix:{
type:Number,trim:true,
minlength:3,
maxlength:10000000000000000000000000000000000000000000000000000000000000000000,
required:true
                },
images:{  type:Object,
                    default:{
                        url:"",
                        publicid:null
                    }}         


},{timestamps:true})

const Furtune = mongoose.model('Furtune',furtuneschema)



function validate(obj) {
    const shcema = joi.object({
        catigory:joi.string().min(3).max(10000000).required(),
        name:joi.string().min(3).max(1000000).required(),
        type:Joi.array().items(joi.string().min(3).max(1000000).required()).required() ,
        color:Joi.array().items(joi.string().min(3).max(1000000).required()).required() , 
        Matières:Joi.array().items(joi.string().min(3).max(1000000).required()).required(), 
        description:joi.string().min(3).max(1000000).required(),
        prix:joi.number().min(3).max(1000000).required()

    })

    return shcema.validate(obj)
}

function validateupdate(obj) {
    const shcema = joi.object({
        catigory:joi.string().min(3).max(1000000).required(),
        name:joi.string().min(3).max(1000000).required(),
        type:Joi.array().items(string().min(3).max(1000000).required()).required() ,
        color:Joi.array().items(string().min(3).max(1000000).required()).required() ,  
        Matières:Joi.array().items(joi.string().min(3).max(1000000).required()).required(), 
        description:joi.string().min(3).max(1000000).required(),
    prix:Joi.number().min(3).max(1000000).required()
 })
    return shcema.validate(obj)
}


module.exports = {validate,validateupdate,Furtune}