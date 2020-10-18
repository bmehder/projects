const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

function writeDataToFile(fileName, content) {
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunck) => {
        body += chunck.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(err);
    }
  });
}

module.exports = { writeDataToFile, getPostData };
