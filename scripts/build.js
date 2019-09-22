import { LanguageDataParser } from '../src';
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
  function repoUrl(url) {
    return 'https://github.com/hyvyys/language-data/blob/master/' + url.replace(/^\//, '');
  }
  function repoLink(url) {
    return `[\`${url}\`](${repoUrl(url)})`;
  }

  let text = "# Data structure\n\n"

    + `The JSON data file ${repoLink('/dist/language-data.json')} `
    + `is generated from JavaScript source ${repoLink('/src/languageData.js')} `
    + "and contains an array of entries, each containing the following fields: "
    + "\n\n"
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

  text += "\n<br>\n"
    + "\n> #### Do not edit manually"
    + `\n> This documentation file is generated from ${repoLink('/src/LanguageDataParser/entryFormat.js')}  `
    + `\n> by the script at ${repoLink('/scripts/build.js')}.  `
    + "\n>  "
    + "\n> To update it, edit either and run `npm run build`.  "
    + "\n> Then you can paste the result here to evaluate the preview  "
    + "but instead of saving, commit your local changes.  "
    ;

  //save to disk
  const filePath = path.join(dir, 'README.md');
  fs.writeFile(filePath, text, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Saved ${filePath}.`);
  });
}