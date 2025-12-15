const fs = require('fs');
const path = require('path');
const rootDir = require('../utill/path');

const favouritePath = path.join(rootDir, 'data', 'favourites.json');

module.exports = class Favourites {

  static getFavourites(cb) {
    fs.readFile(favouritePath, (err, data) => {
      if (!err && data.length > 0) {
        cb(JSON.parse(data));
      } else {
        cb([]);
      }
    });
  }

  static addFavourite(contactId) {
    this.getFavourites((favourites) => {
      if (!favourites.includes(contactId)) {
        favourites.push(contactId);
        fs.writeFile(
          favouritePath,
          JSON.stringify(favourites, null, 2),
          err => err && console.log(err)
        );
      }
    });
  }

  static deleteFavourite(contactId, cb) {
    this.getFavourites((favourites) => {
      const updated = favourites.filter(id => id !== contactId);
      fs.writeFile(
        favouritePath,
        JSON.stringify(updated, null, 2),
        cb
      );
    });
  }
};
