const fs = require('fs');
const path = require('path');
const rootDir = require('../utill/path');

const Favourites = require('./favourites');
const BlockList = require('./blocklist');  

const dataPath = path.join(rootDir, 'data', 'contacts.json');

module.exports = class Contact {

  constructor(name, phone, email, dob, address) {
    this.id = null;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.dob = dob;
    this.address = address;
  }

  save() {
    Contact.fetchAll((contacts) => {
      if (this.id) {
        contacts = contacts.map(c =>
          c.id === this.id ? this : c
        );
      } else {
        this.id = Math.random().toString();
        contacts.push(this);
      }

      fs.writeFile(
        dataPath,
        JSON.stringify(contacts, null, 2),
        err => err && console.log(err)
      );
    });
  }

  static fetchAll(cb) {
    fs.readFile(dataPath, (err, data) => {
      if (err || !data.length) {
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    });
  }

  static findById(id, cb) {
    this.fetchAll((contacts) => {
      const contact = contacts.find(c => c.id === id);
      cb(contact);
    });
  }

  static deleteById(id, cb) {
    this.fetchAll((contacts) => {
      const updatedContacts = contacts.filter(c => c.id !== id);

      fs.writeFile(
        dataPath,
        JSON.stringify(updatedContacts, null, 2),
        (err) => {
          if (err) return cb && cb(err);

          Favourites.deleteFavourite(id, () => {
            BlockList.unblock(id, () => {
              cb && cb();
            });
          });
        }
      );
    });
  }
};
