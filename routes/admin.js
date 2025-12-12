const express = require('express');
const router = express.Router();
const contactController=require('../controllers/contact')

const contacts = []; 

// GET request
router.get('/add-contact',contactController.getAddContact);
router.post('/add-contact', contactController.postAddContact);

// POST request


exports.routes = router;
exports.contacts = contacts;