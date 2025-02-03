const express = require('express');
const router = express()
const {getaccounts, getid, postprofilephoto} = require('../controllers/userscontroller')
const {verifyAdminToken, verifyToken} = require('../middleware/verifytoken');
const {photoupload} = require('../middleware/photoupload');
/** -------------   ------------------------  */

router.get('/',verifyAdminToken,getaccounts)
router.get('/:id',getid)
router.post('/profile-photo-upload',photoupload.single("image"),verifyToken,postprofilephoto)








module.exports = router
