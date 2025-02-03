const mongoose = require("mongoose");
const Joi = require("joi");
const joi = require("joi");

const commentsschema = new mongoose.Schema({
name:{
    type:String,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true
},
url:{  type:String,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true}, 
comment:{  type:String,
                trim:true,
                minlength:3,
                maxlength:100000,
                required:true}   ,      


},{timestamps:true})

const Comment = mongoose.model('Comment',commentsschema)



function validate(obj) {
    const shcema = joi.object({
        name:joi.string().min(3).max(10000000).required(),
        url:joi.string().min(3).max(1000000).required(),
        comment:joi.string().min(3).max(100000).required()

    })

    return shcema.validate(obj)
}

function validateupdate(obj) {
    const shcema = joi.object({
        name:joi.string().min(3).max(10000000).required(),
        url:joi.string().min(3).max(1000000).required(),
        comment:joi.string().min(3).max(100000).required()
 })
    return shcema.validate(obj)
}




module.exports = {validate,validateupdate,Comment}