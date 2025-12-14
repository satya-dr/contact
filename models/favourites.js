const fs = require('fs');
const path = require('path');
const rootDir = require('../utill/path');

const favouritePath = path.join(rootDir, 'data', 'favourites.json');

module.exports = class Favourites {

  static addFavourite(contactId) {
    this.getFavourites((favourites) => {
      if (!favourites.includes(contactId)) {
        favourites.push(contactId);
        fs.writeFile(
          favouritePath,
          JSON.stringify(favourites),
          err => console.log(err)
        );
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritePath, (err, data) => {
      if (!err && data.length > 0) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
};
