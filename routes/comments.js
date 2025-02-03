const express = require('express');
const { postfur,getfur,getfurid,postfurtunephoto} = require('../controllers/furtunecontroller');
const router = express();
const {furphotoupload} = require('../middleware/photoupload'); 
const { verifyid } = require('../middleware/verifytoken');
const { comment } = require('../controllers/commentcontroller');


router.post("/",comment)

module.exports = router