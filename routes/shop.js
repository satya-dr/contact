const express = require('express');
const router = express.Router();
const contactController=require('../controllers/contact')
const adminData = require('./admin'); 

router.get('/', contactController.getContact);



module.exports = router;