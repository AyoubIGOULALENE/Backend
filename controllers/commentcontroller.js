const express = require('express')
const {validate,validateupdate,Comment} = require('../models/Comment')
const asynchandler = require("express-async-handler");
const router = express()
 //

const comment = asynchandler(async(req,res) => {
  const { error } = validate(req.body)
  if(error){
    res.status(500).json({message:error.details[0].message})
 }

 const comment = new Comment({
    name:req.body.name,
url:req.body.url,
comment:req.body.comment
 })
const response = await comment.save()
res.status(200).json(response)

})

module.exports = {comment}