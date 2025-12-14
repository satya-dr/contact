const Contact = require('../models/contact');
const Favourites = require('../models/favourites');

/* ===============================
   ADD CONTACT
================================ */
const getAddContact = (req, res) => {
  res.render('admin/add-contact', {
    pageTitle: "Add Contact",
    activePage: 'add'
  });
};

const postAddContact = (req, res) => {
  const { name, phone, email, dob, address } = req.body;
  const contact = new Contact(name, phone, email, dob, address);
  contact.save();

  res.render('shop/contact-added', {
    pageTitle: "Added Successfully",
    activePage: 'add'
  });
};

/* ===============================
   ALL CONTACTS
================================ */
const getContact = (req, res) => {
  Contact.fetchAll((contacts) => {
    const cleanContacts = contacts.filter(c => c);

    res.render('shop/user', {
      contacts: cleanContacts,
      pageTitle: "My Contacts",
      activePage: 'contacts'
    });
  });
};

/* ===============================
   CONTACT DETAILS
================================ */
const getContactDetails = (req, res) => {
  const contactId = req.params.contactId;

  Contact.findById(contactId, (contact) => {
    if (!contact) {
      return res.redirect('/');
    }

    res.render('shop/contact-details', {
      contact: contact,
      pageTitle: contact.name,
      activePage: 'contacts'
    });
  });
};

/* ===============================
   FAVOURITES
================================ */
const postFavourite = (req, res) => {
  const contactId = req.body.contactId;
  if (contactId) {
    Favourites.addFavourite(contactId);
  }
  res.redirect('/favourites');
};

const getFavourite = (req, res) => {
  Favourites.getFavourites((favourites) => {
    Contact.fetchAll((savedContacts) => {
      const favouritesWithDetails = favourites
        .map(id => savedContacts.find(c => c && c.id === id))
        .filter(Boolean);

      res.render('shop/favourite-list', {
        favourites: favouritesWithDetails,
        pageTitle: "My Favourite",
        activePage: 'favourites'
      });
    });
  });
};

module.exports = {
  getAddContact,
  postAddContact,
  getContact,
  getContactDetails,
  postFavourite,
  getFavourite
};
