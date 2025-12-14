const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');


router.get('/', contactController.getContact);
router.get('/contacts/:contactId', contactController.getContactDetails);
router.post('/favourites', contactController.postFavourite);
router.get('/favourites', contactController.getFavourite);

module.exports = router;
