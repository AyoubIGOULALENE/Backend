const mongoose = require("mongoose");
const Joi = require("joi");
const joi = require("joi");
//
const Userschema = new mongoose.Schema({
Email : {
type:String,
trim:true,
minlength:3,
maxlength:1000000,
required:true
},
Password : {
    type:String,
    trim:true,
    lengthmin:3,
    maxlength:1000000,
    required:true
},

Username : {
    type:String,
    trim:true,
    minlength:3,
    maxlength:1000000,
    required:true
},
isadmin : {
    type:Boolean,
default : false
},
profilephoto:{
    type:Object,
    default:{
        url:"https://th.bing.com/th/id/OIP.SAcV4rjQCseubnk32USHigHaHx?rs=1&pid=ImgDetMain",
        publicid:null
    }
}
},{timestamps:true})



const User = mongoose.model("User",Userschema);


function register(obj) {
   const Schema = Joi.object({
    Email : joi.string().min(3).max(100000).email().trim().required(),
    Password : joi.string().min(3).max(100000).trim().required(),
    Username : joi.string().min(3).max(100000).trim().required(),
    isadmin : joi.boolean().default(false)
   }) 

   return Schema.validate(obj)
}



function Login(obj) {
    const Schema = Joi.object({
        Email : joi.string().min(3).max(100000).email().trim().required(),
        Password : joi.string().min(3).max(100000).trim().required(),
       }) 
       return Schema.validate(obj)
}



function Updateacc(obj) {
    const Schema = Joi.object({
        Email : joi.string().min(3).max(100000).email().trim().required(),
        Password : joi.string().min(3).max(100000).trim().required(),
       }) 
       return Schema.validate(obj)
}




module.exports = {User,Updateacc,Login,register}
