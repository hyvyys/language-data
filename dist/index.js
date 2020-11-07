const path = require('path');
const fs = require('fs');

const cd = path.resolve(".");
process.chdir( __dirname );
const text = fs.readFileSync('language-data.json');
const data = JSON.parse(text);
process.chdir( cd );

module.exports = data;