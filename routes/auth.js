const express = require('express');
const router = express()
const {registerpost,Loogin} = require('../controllers/authcontroller')

/** -------------   ------------------------  */
router.post('/register',registerpost)
router.post('/login',Loogin)








module.exports = router