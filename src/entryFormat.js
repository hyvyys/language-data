import findHtmlTag from './findHtmlTag';
import findOpentypeTag from './findOpentypeTag';
import findScriptName from './findScriptName';

/*
  Each entry in the array exported from Languages.js
  represents a typographic convention for a given language and script.
  I.e., separate entries are provided for languages with several conventions,
  e.g. Serbian Latin and Serbian Cyrillic.
  Some languages may present several conventions for the same script,
  e.g. Mapudungun has three different spelling systems, all using Latin.

  First some meta-metadata about the metadata in this file.
  Entry definition format with examples:
*/
const entryDefinition = {
  type: String,       // constructor function,
  required: true,     // determines whether the value can be left undefined,
  regex: /[A-Z ]{4}/, // defines acceptable values,
  default: 'DFLT',    // value used to fill in missing fields in index.js
  // or function used to calculate it with the whole entry as argument
  description: "Field description formatted in Markdown, "
    + "separated into lines each typically terminated by space. "
    + "This field is used by the build script to generate documentation. ",
}
/*
  Fields with a defined `default` value can be omitted and will be added automatically.

  All array fields are specified as `required` with `default` [].
  This way code using this module only has to check for length of these fields,
  and in many cases (as when using loops or Array.map) fails silently if it doesn't.
*/

/* Entry definitions, finally: */

export default {
  language: {
    type: String,
    required: true,
    description: "Language name in English. ",
  },
  altNames: {
    type: Array,
    of: String,
    description: "Alternative language names, also used for looking up HTML tags if default fails. ",
  },
  // 
  htmlTag: {
    type: String,
    required: true,
    regex: /[a-z]{2,3}/,
    default: entry => findHtmlTag(entry),
    description: "A minimal BCP-47 language tag used for HTML lang attribute. "
      + "Spec: https://www.ietf.org/rfc/bcp/bcp47.txt. "
      + "Typically equivalent to the 2-letter ISO-639-1 code "
      + "or the 3-letter ISO-639-3 code when the former isn't defined. ",
  },
  opentypeTag: {
    type: String,
    regex: /[A-Z0-9 ]{4}/,
    default: entry => findOpentypeTag(entry),
    description: "Four-character language code (often three letters followed by space), "
      + "used by OpenType features; list of supported codes can be found at "
      + "https://docs.microsoft.com/en-us/typography/opentype/spec/languagetags. "
      + "For unsupported languages, some engines (notably Harfbuzz) "
      + "use ISO-639-3 codes as fallback, so it might be useful to implement them in fonts. ",
  },
  // 
  script: {
    type: String,
    required: true,
    regex: /[A-Z][a-z]{3}/,
    default: 'Latn',
    description: "Four letter ISO-15924 script code, e.g. 'Latn' or 'Cyrl'. "
      + "Or the arbitrary value 'IPA', used for the IPA entry. ",
  },
  scriptName: {
    type: String,
    required: true,
    regex: /[A-Za-z ]*/,
    default: entry => findScriptName(entry),
    description: "ISO-15924 script name, e.g. Latin or Cyrillic. "
      + "'IPA' for the (pseudo-)language IPA. ",
  },
  region: {
    type: String,
    description: "Arbitrary geographical region that the language belongs in. ",
  },
  speakers: {
    type: Number,
    default: 0,
    description: "Number of L1 (native) speakers. Can be set to 0 for artificial languages "
      + "or typographical conventions that don't correspond to an actual language, "
      + "e.g. phonetic transcription. ",
  },
  pangrams: {
    type: Array,
    of: String,
    default: [],
    description: "Pangrams, i.e. sentences that contain all letters of the language's alphabet. ",
  },
  letterings: {
    type: Array,
    of: String,
    default: [],
    description: "Letterings, i.e. strings of words starting with each letter of the language's alphabet, "
      + "preferably also repeating the initial letter within. This way a single word can be used "
      + "to show off both uppercase and lowercase in a natural setting. ",
  },
  sentences: {
    type: Array,
    of: String,
    default: [],
    description: "Single sentences in the given language, approx. 100-200 characters. ",
  },
  paragraphs: {
    type: Array,
    of: String,
    default: [],
    description: "Paragraphs, i.e. longer passages in the given language, approx. 250-750 characters. ",
  },
  smallcaps: {
    type: Array,
    of: String,
    default: [],
    description: "Paragraphs or sentences in HTML, sprinkled with small caps words formatted like this:\n\n"
      + "```html\n"
      + "<span style='font-variant-caps: all-small-caps;'>AWOL<span> "
      + "\n```",
  },
  gotchas: {
    type: Array,
    of: Object,
    default: [],
    description: "Typographic challenges specific to given language, "
      + "e.g. required ligatures, kerning/spacing pairs (also for punctuation), "
      + "things to look out for when adding language support to a font. ",
    fields: {
      topic: {
        type: String,
        description: "Concerned letters or their names (applies to diacritics), "
          + "or other concise description of the issue.",
      },
      tags: {
        type: Array,
        of: String,
        description: "Each element is one of `(metrics|ligature|contextual|localization|congruency|optional)`, where:\n"
          + "\n"
          + "* `metrics` — is related to spacing or kerning,\n"
          + "* `ligature` — concerns a possibly needed ligature,\n"
          + "* `contextual` — concerns a possibly needed contextual alternate,\n"
          + "* `localization` — is related to alternate localized glyphs, "
          + "(gotchas without this tag are just pointers to making a better font in general)"
          + "* `congruency` — regards interplay between design of particular glyphs\n"
          + "* `optional` — means the issue might be considered irrelevant "
          + "(the feature it describes is more `nice-to-have` than `must-have`)."
        ,
        regex: /(metrics|ligature|contextual|localization|congruency|optional)/,
      },
      tests: {
        type: Array,
        of: String,
        description: `Strings that can be used to test a font against the issue.`,
      }
    },
  },
  specialCharacters: {
    type: String,
    description: "Special characters (mainly accented letters — diacritics) used by the language.",
    default: '',       // comment this out when all languages have this field specified
    // required: true, // uncomment when all languages have this field specified
  },
  alphabet: {
    type: String,
    description: "The letters of the language's alphabet in order, separated by spaces. "
      + "Typically A-Z with `specialCharacters` intertwined or appended, "
      + "depending on the language's convention. ",
    default: '',    // comment this out when all languages have this field specified
    // required: true, // uncomment when all languages have this field specified
  }
};
