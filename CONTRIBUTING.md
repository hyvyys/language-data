# Development

To add changes to the project, please start from modifying the `src/languageData.js` source file.
If needed, adjust the remaining files responsible for processing the data.
After that, run the `build` script to see the changes reflected in the JSON output.
You can use the `watch` script to rebuild the output continuously on each change to the sources.


## Testing the files in Node.js

The sources are in ES6 so if you want to run a JS test file directly in Node.js,
use the [`esm`](https://www.npmjs.com/package/esm) module.
Clone the project, run `npm i` and after that, run any test files as follows:

`node -r esm yourTestFile.js`

This is how the `npm run build` script that spits out the JSON is run as well.
It internally turns debugging messages on like this:

```javascript
import { LanguageDataParser } from 'src/language-data';
new LanguageDataParser({ debug: true }).getData();
```

## Before committing

Rebuild the JSON data and Markdown docs before committing.

```
npm run build
```

## Publishing version

```bash
npm version patch -m "version description"  # patch|minor|major
git push --tags
npm publish
```