# Development

The sources are in ES6 so to develop and test in Node.js, use the [`esm`](https://www.npmjs.com/package/esm) module. Clone the project, run `npm i` and after that, run any test files as follows:

`node -r esm yourFile.js`

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