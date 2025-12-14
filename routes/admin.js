const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.get('/add-contact', contactController.getAddContact);
router.post('/add-contact', contactController.postAddContact);

module.exports = router;
