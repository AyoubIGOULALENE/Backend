const express = require('express');
const router = express()
const {cartinfo,getcart} = require('../controllers/cartcomtroller')
//


router.post("/",cartinfo)
router.get("/",getcart)
module.exports = router