# Data structure

The JSON data file [`/dist/language-data.json`](https://github.com/hyvyys/language-data/blob/master/dist/language-data.json) is generated from JavaScript source [`/src/languageData.js`](https://github.com/hyvyys/language-data/blob/master/src/languageData.js) and contains an array of entries, each containing the following fields: 

Field | Data type | Description
--- | --- | ---
**language** | `String` | Language name in English. 
**altNames** | `Array` of `String` | Alternative language names, also used for looking up HTML tags if default fails. 
**htmlTag** | `String` | A minimal [BCP-47 language tag](https://www.ietf.org/rfc/bcp/bcp47.txt) used for HTML lang attribute. Typically equivalent to the 2-letter ISO-639-1 code or the 3-letter ISO-639-3 code when the former isn't defined. 
**opentypeTag** | `String` | [Four-character language code](https://docs.microsoft.com/en-us/typography/opentype/spec/languagetags) used by OpenType features. For unsupported languages, some engines (notably Harfbuzz) use ISO-639-3 codes as fallback, so it might be useful to implement them in fonts. 
**script** | `String` | Four letter ISO-15924 script code, e.g. `Latn` or `Cyrl`. Or the arbitrary value `IPA`, used for the IPA entry. 
**scriptName** | `String` | ISO-15924 script name, e.g. `Latin` or `Cyrillic`. `IPA` for the (pseudo-)language IPA. 
**region** | `String` | Arbitrary geographical region that the language belongs in. 
**speakers** | `Number` | Number of L1 (native) speakers. Can be set to 0 for artificial languages or typographical conventions that don't correspond to an actual language, e.g. phonetic transcription. 
**pangrams** | `Array` of `String` | Pangrams, i.e. sentences that contain all letters of the language's alphabet. 
**letterings** | `Array` of `String` | Letterings, i.e. strings of words starting with each letter of the language's alphabet, preferably also repeating the initial letter within. This way a single word can be used to show off both uppercase and lowercase in a natural setting. 
**sentences** | `Array` of `String` | Single sentences in the given language, approx. 100-200 characters. 
**paragraphs** | `Array` of `String` | Paragraphs, i.e. longer passages in the given language, approx. 250-750 characters. 
**smallcaps** | `Array` of `String` | Paragraphs or sentences in HTML, sprinkled with small caps words formatted like this: `<span style='font-variant-caps: all-small-caps;'>AWOL<span>` 
**gotchas** | `Array` of `Object` | Typographic challenges specific to given language, e.g. required ligatures, kerning/spacing pairs (also for punctuation), things to look out for when adding language support to a font. 
gotchas[i].**topic** | `String` | Concerned letters or their names (applies to diacritics), or other concise description of the issue.
gotchas[i].**tags** | `Array` of `String` | One or more of:<ul><li>`metrics` — for issues related to spacing or kerning,</li><li>`ligature` — concerning a possibly needed ligature,</li><li>`contextual` — concerning a possibly needed contextual alternate,</li><li>`localization` — related to alternate localized glyphs, (gotchas without this tag are just pointers to making a better font in general)</li><li>`congruency` — regarding interplay between design of particular glyphs</li><li>`optional` — for issues that might be considered irrelevant (the described feature is more `nice-to-have` than `must-have`).</li></ul>
gotchas[i].**description** | `String` | Description of the issue and/or design recommendations.
gotchas[i].**tests** | `Array` of `String` | Strings that can be used to test a font against the issue.
**specialCharacters** | `String` | Special characters (mainly accented letters — diacritics) used by the language.
**alphabet** | `String` | The letters of the language's alphabet in order, separated by spaces. Typically A-Z with `specialCharacters` intertwined or appended, depending on the language's convention. 

<br>

> #### Do not edit manually
> This documentation file is generated from [`/src/LanguageDataParser/entryFormat.js`](https://github.com/hyvyys/language-data/blob/master/src/LanguageDataParser/entryFormat.js)  
> by the script at [`/scripts/build.js`](https://github.com/hyvyys/language-data/blob/master/scripts/build.js).  
>  
> To update it, edit either and run `npm run build`.  
> Then you can paste the result here to evaluate the preview  but instead of saving, commit your local changes.  