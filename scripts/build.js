import { LanguageDataParser } from '../';
import entryFormat from '../src/LanguageDataParser/entryFormat';
const fs = require('fs');
const path = require('path');

/* create output directory */
const dir = "./dist";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

generateDoc();
buildJsonData();

/* generate JSON with parsed data from Languages */
function buildJsonData() {
  // limit data to the fields requested as commandline arguments
  let fields = process.argv.slice(2).filter((val) => val in entryFormat);
  if (fields.length) {
    fields.unshift('language');
  }
  else {
    fields = null;
  }
  // get and parse the data
  const languages = (new LanguageDataParser({ debug: true })).getData();
  const text = JSON.stringify(languages, fields, 2);

  //save to disk
  const filePath = path.join(dir, 'language-data.json');
  fs.writeFile(filePath, text, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Saved ${filePath}.`);
  });
}

/* generate entry format doc */

function generateDoc() {
  let text = `# Data structure\n\n`
    + `The JSON data file contains an array of entries, each containing the following fields:\n\n`;

  function printFieldInfo(format, fieldName, headerLevel) {
    const info = format[fieldName];

    const dataType = info.type.name
      + (info.of ? (' of ' + info.of.name) : '');
    text += `${'#'.repeat(headerLevel)} ${fieldName} (${dataType})\n\n`
      + `${info.description}\n\n`
      ;

    if (info.fields) {
      text += 'Fields:\n\n'
      for (let fieldName in info.fields) {
        printFieldInfo(info.fields, fieldName, 4);
      }
    }
  }

  for (let fieldName in entryFormat) {
    printFieldInfo(entryFormat, fieldName, 3);
  }

  //save to disk
  const filePath = path.join(dir, 'entryFormat.md');
  fs.writeFile(filePath, text, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Saved ${filePath}.`);
  });
}