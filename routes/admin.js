const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// ADD
router.get('/add-contact', contactController.getAddContact);
router.post('/add-contact', contactController.postAddContact);

// EDIT
router.get('/edit-contact/:contactId', contactController.getEditContact);
router.post('/edit-contact', contactController.postEditContact);

// DELETE 
router.post('/delete-contact/:contactId', contactController.postDeleteContact);

// BLOCK
router.post('/block-contact/:contactId', contactController.postBlockContact);
router.post('/unblock-contact/:contactId', contactController.postUnblockContact);



module.exports = router;
