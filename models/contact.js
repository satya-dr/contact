const fs = require('fs');
const path = require('path');
const rootDir = require('../utill/path');

const filePath = path.join(rootDir, 'data', 'contacts.json');

module.exports = class Contact {

  constructor(name, phone, email, dob, address) {
    this.id = Math.random().toString();   // ✅ FIX 1
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.dob = dob;
    this.address = address;
  }

  save() {
    Contact.fetchAll((contacts) => {
      contacts.push(this);
      fs.writeFile(filePath, JSON.stringify(contacts), err => {
        if (err) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, data) => {
      let contacts = [];
      if (!err && data.length > 0) {
        contacts = JSON.parse(data);
      }
      cb(contacts.filter(c => c));   // ✅ FIX 2
    });
  }

  static findById(id, callback) {
    this.fetchAll((contacts) => {
      const contact = contacts.find(c => c.id === id);
      callback(contact);
    });
  }
};
