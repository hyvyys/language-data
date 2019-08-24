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
  let text = "> This file is generated from [`/src/LanguageDataParser/entryFormat.js`]"
    + "(https://github.com/hyvyys/language-data/blob/master/src/LanguageDataParser/entryFormat.js).\n\n"

    + "# Data structure\n\n"

    + "The JSON data file [`/dist/language-data.json`]"
    + "(https://github.com/hyvyys/language-data/blob/master/dist/language-data.json) "
    + "is generated from JavaScript source "
    + "[`/src/languageData.js`](https://github.com/hyvyys/language-data/blob/master/src/languageData.js) "
    + "and contains an array of entries, each containing the following fields:\n\n"

    + "Field | Data type | Description\n"
    + "--- | --- | ---\n";

  function printFieldInfo(format, fieldName, parentField) {
    const info = format[fieldName];

    const fullFieldName = parentField
      ? `${parentField}[i].**${fieldName}**`
      : `**${fieldName}**`;
    const dataType = `\`${info.type.name}\``
      + (info.of ? ` of \`${info.of.name}\`` : '');
    const description = info.description
      .replace(/\|/g, '\\|')
      .replace(/\n+/g, '\n')
      .replace(/\n\* ([^\n]+)/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/g, '');     

    const row = `${fullFieldName} | ${dataType} | ${description}\n`
    text += row;

    if (info.elementFields) {
      const elementFields = info.elementFields;
      for (let subFieldName in elementFields) {
        printFieldInfo(elementFields, subFieldName, fieldName);
      }
    }
  }

  for (let fieldName in entryFormat) {
    printFieldInfo(entryFormat, fieldName);
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