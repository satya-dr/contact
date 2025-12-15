const fs = require('fs');
const path = require('path');
const rootDir = require('../utill/path');

const blockPath = path.join(rootDir, 'data', 'blocked.json');

module.exports = class BlockList {

  static getBlocked(cb) {
    fs.readFile(blockPath, (err, data) => {
      if (!err && data.length > 0) {
        cb(JSON.parse(data));
      } else {
        cb([]);
      }
    });
  }

  static block(contactId, cb) {
    this.getBlocked((blocked) => {
      if (!blocked.includes(contactId)) {
        blocked.push(contactId);
      }

      fs.writeFile(
        blockPath,
        JSON.stringify(blocked, null, 2),
        cb
      );
    });
  }

  static unblock(contactId, cb) {
    this.getBlocked((blocked) => {
      const updated = blocked.filter(id => id !== contactId);

      fs.writeFile(
        blockPath,
        JSON.stringify(updated, null, 2),
        cb
      );
    });
  }
};
