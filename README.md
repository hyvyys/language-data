# Language Data

Linguistic data especially useful for font designers: pangrams, sample sentences, character sets and metadata for the languages of the world. Extent and completeness of the data is limited, contributions are welcome!

[Data structure](https://github.com/hyvyys/language-data/blob/master/dist/README.md)

[![npm](https://img.shields.io/npm/v/language-data)](https://www.npmjs.com/package/language-data)

# Usage

Install from NPM or from GitHub:

`npm i language-data`

`npm i hyvyys/language-data`

## ES6 module

```javascript
import LanguageData from 'language-data';

const polish = LanguageData.find(l => l.language == 'Polish');
console.log(JSON.stringify(polish, null, 2));
```

## CommonJS (Node.js)

```javascript
const LanguageData = require('./dist');

const polish = LanguageData.find(l => l.language == 'Polish');
console.log(JSON.stringify(polish, null, 2));
```

## Result

<details><summary>See result</summary>

  ```
  {
    "language": "Polish",
    "region": "European",
    "speakers": 40000000,
    "pangrams": [
      "Koń i żółw grali w kości z piękną ćmą u źródła."
    ],
    "letterings": [
      "Aerofłot Bóbr Część Ćmić Dyndasz Ernest Farfocel Gringo Hochsztapler Irbis Jajko Krokus
       Lalka Łękotka Mąkami Nanizać Obrok Ósemka Poprzestań Quiz Rzeżączka Schniesz Świąt Tarty
       Uzurpator Victoria Warszawa Xero Yeti Złorzeczyć Źrebak Żółtko"
    ],
    "gotchas": [
      {
        "topic": "łł",
        "tags": [
          "metrics"
        ],
        "description": "The łł combination an sometimes produces a busy area. A spacing, kerning or ligature solution is possible should the problem arise.",
        "tests": [
          "Kołłątaj Piłka Ełk Półkole Półton PÓŁTON Radziwiłłów"
        ]
      }
    ],
    "specialCharacters": "Ą ą Ć ć Ę ę Ł ł Ń ń Ó ó Ś ś Ź ź Ż ż",
    "htmlTag": "pl",
    "opentypeTag": "PLK",
    "script": "Latn",
    "scriptName": "Latin",
    "sentences": [],
    "paragraphs": [],
    "smallcaps": [],
    "alphabet": "A a Ą ą B b C c Ć ć D d E e Ę ę F f G g H h I i J j K k L l Ł ł M m N n Ń ń O o Ó ó P p Q q R r S s Ś ś T t U u V v W w X x Y y Z z Ź ź Ż ż",
    "optionalCharacters": "",
    "optionalCharactersNote": ""
  }
  ```
</details>

## Custom JSON

The data is exported as a JSON file in [`/dist/language-data.json`](https://github.com/hyvyys/language-data/blob/master/dist/language-data.json).

If you want a file limited to the data you're interested in, you can build it yourself. Clone the repository, install dependencies `npm i`, and build it `npm run build -- [fields]` where `[fields]` is a space-delimited list of fields you want to include, e.g.:

```
npm run build -- script speakers pangrams
```

The list of available fields with their descriptions is in [`/dist/README.md`](https://github.com/hyvyys/language-data/blob/master/dist/README.md).

# Roadmap

  * Add missing fields `pangram` — for example choose from http://clagnut.com/blog/2380/, but not all languages are present there.
  * Add missing fields `lettering` — for example using [WordFinder](https://hyvyys.github.io/word-finder).