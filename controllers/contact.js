const Contact = require('../models/contact');
const Favourites = require('../models/favourites');
const BlockList = require('../models/blocklist');


exports.getAddContact = (req, res) => {
  res.render('admin/edit-contact', {
    pageTitle: "Add Contact",
    activePage: 'add',
    editing: false
  });
};

exports.postAddContact = (req, res) => {
  const { name, phone, email, dob, address } = req.body;

  const contact = new Contact(name, phone, email, dob, address);
  contact.save();

  return res.redirect('/');
};


exports.getEditContact = (req, res) => {
  const editing = req.query.editing === 'true';
  const contactId = req.params.contactId;

  if (!editing) {
    return res.redirect('/');
  }

  Contact.findById(contactId, contact => {
    if (!contact) {
      return res.redirect('/');
    }

    res.render('admin/edit-contact', {
      pageTitle: "Edit Contact",
      activePage: 'edit',
      editing: true,
      contact
    });
  });
};

exports.postEditContact = (req, res) => {
  console.log("EDIT SUBMIT:", req.body); 

  const { id, name, phone, email, dob, address } = req.body;

  const updatedContact = new Contact(name, phone, email, dob, address);
  updatedContact.id = id;  

  updatedContact.save();

  return res.redirect('/');
};

exports.getContact = (req, res) => {
  BlockList.getBlocked((blockedIds) => {
    Contact.fetchAll((contacts) => {
      const visibleContacts = contacts.filter(
        c => !blockedIds.includes(c.id)
      );

      res.render('shop/user', {
        contacts: visibleContacts,
        pageTitle: "My Contacts",
        activePage: 'contacts'
      });
    });
  });
};



exports.getContactDetails = (req, res) => {
  const contactId = req.params.contactId;

  Contact.findById(contactId, contact => {
    if (!contact) {
      return res.redirect('/');
    }

    res.render('shop/contact-details', {
      contact,
      pageTitle: contact.name,
      activePage: 'contacts'
    });
  });
};

exports.postFavourite = (req, res) => {
  const contactId = req.body.contactId;
  if (contactId) {
    Favourites.addFavourite(contactId);
  }
  res.redirect('/favourites');
};

exports.getFavourite = (req, res) => {
  Favourites.getFavourites(favourites => {
    Contact.fetchAll(contacts => {
      const favContacts = favourites
        .map(id => contacts.find(c => c.id === id))
        .filter(Boolean);

      res.render('shop/favourite-list', {
        favourites: favContacts,
        pageTitle: "My Favourite",
        activePage: 'favourites'
      });
    });
  });
};
exports.postDeleteContact = (req, res) => {
  const contactId = req.params.contactId;

  Contact.deleteById(contactId, (err) => {
    if (err) {
      console.log("Error deleting contact:", err);
    }
    return res.redirect('/');
  });
};


exports.postRemoveFavourite = (req, res) => {
  const contactId = req.body.contactId;

  Favourites.deleteFavourite(contactId, () => {
    res.redirect('/favourites');
  });
};


exports.postBlockContact = (req, res) => {
  const contactId = req.params.contactId;

  BlockList.block(contactId, () => {
    Favourites.deleteFavourite(contactId, () => {
      res.redirect('/');
    });
  });
};


exports.getBlockedContacts = (req, res) => {
  BlockList.getBlocked((blockedIds) => {
    Contact.fetchAll((contacts) => {
      const blockedContacts = contacts.filter(c =>
        blockedIds.includes(c.id)
      );

      res.render('shop/block-list', {
        contacts: blockedContacts,
        pageTitle: 'Blocked Contacts',
        activePage: 'block'
      });
    });
  });
};

exports.postUnblockContact = (req, res) => {
  const contactId = req.params.contactId;

  BlockList.unblock(contactId, () => {
    res.redirect('/block-list');
  });
};
