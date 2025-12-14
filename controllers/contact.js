const Contact = require('../models/contact');
const Favourites = require('../models/favourites');


const getAddContact = (req, res, next) => {
  res.render('admin/add-contact', {
    pageTitle: "Add Contact"
  });
};

const postAddContact = (req, res, next) => {
  const { name,phone, email, dob, address } = req.body;

  const contact = new Contact(name, phone, email, dob, address);
  contact.save();

  res.render('shop/contact-added', {
    pageTitle: "Added Successfully"
  });
};

const getContact = (req, res, next) => {
  Contact.fetchAll((contacts) => {
    const cleanContacts = contacts.filter(c => c); // ✅ remove null
    res.render('shop/user', {
      contacts: cleanContacts,
      pageTitle: "My Contacts"
    });
  });
};
const getContactDetails = (req, res, next) => {
  const contactId = req.params.contactId;

  Contact.findById(contactId, (contact) => {
    if (!contact) {
      return res.redirect('/');
    }

    res.render('shop/contact-details', {
      contact: contact,
      pageTitle: contact.name
    });
  });
};


const postFavourite = (req, res, next) => {
  const contactId = req.body.contactId;
  Favourites.addFavourite(contactId);   // ✅ এখানে add হবে
  res.redirect('/favourites',{
      pageTitle: "My Favourite"}
    );
};

const getFavourite = (req, res, next) => {

  Favourites.getFavourites((favourites)=>{
    Contact.fetchAll((savedContacts)=>{
      const favouritesWithDetails = favourites
  .map(contactId =>
    savedContacts.find(contact => contact && contact.id === contactId)
  )
  .filter(Boolean);
      res.render('shop/favourite-list', {
        favourites:favouritesWithDetails,
      pageTitle: "My Favourite"
    });
    })
  })
  
};


module.exports = {
  getAddContact,
  postAddContact,
  getContact,
  getContactDetails,
  postFavourite,
  getFavourite
};
