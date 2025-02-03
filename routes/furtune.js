const express = require('express');
const { postfur,getfur,getfurid,postfurtunephoto} = require('../controllers/furtunecontroller');
const router = express();
const {furphotoupload} = require('../middleware/photoupload'); 
const { verifyid } = require('../middleware/verifytoken');


router.get('/',getfur);
router.get('/:id',getfurid)
router.post("/",postfur)
router.post('/furtune-photo-upload/:id',furphotoupload.single("image"),postfurtunephoto)










module.exports = router