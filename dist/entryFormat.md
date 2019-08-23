# Data structure

The JSON data file contains an array of entries, each containing the following fields:

### language (String)

Language name in English. 

### altNames (Array of String)

Alternative language names, also used for looking up HTML tags if default fails. 

### htmlTag (String)

A minimal BCP-47 language tag used for HTML lang attribute. Spec: https://www.ietf.org/rfc/bcp/bcp47.txt. Typically equivalent to the 2-letter ISO-639-1 code or the 3-letter ISO-639-3 code when the former isn't defined. 

### opentypeTag (String)

Four-character language code (often three letters followed by space), used by OpenType features; list of supported codes can be found at https://docs.microsoft.com/en-us/typography/opentype/spec/languagetags. For unsupported languages, some engines (notably Harfbuzz) use ISO-639-3 codes as fallback, so it might be useful to implement them in fonts. 

### script (String)

Four letter ISO-15924 script code, e.g. 'Latn' or 'Cyrl'. Or the arbitrary value 'IPA', used for the IPA entry. 

### scriptName (String)

ISO-15924 script name, e.g. Latin or Cyrillic. 'IPA' for the (pseudo-)language IPA. 

### region (String)

Arbitrary geographical region that the language belongs in. 

### speakers (Number)

Number of L1 (native) speakers. Can be set to 0 for artificial languages or typographical conventions that don't correspond to an actual language, e.g. phonetic transcription. 

### pangrams (Array of String)

Pangrams, i.e. sentences that contain all letters of the language's alphabet. 

### letterings (Array of String)

Letterings, i.e. strings of words starting with each letter of the language's alphabet, preferably also repeating the initial letter within. This way a single word can be used to show off both uppercase and lowercase in a natural setting. 

### sentences (Array of String)

Single sentences in the given language, approx. 100-200 characters. 

### paragraphs (Array of String)

Paragraphs, i.e. longer passages in the given language, approx. 250-750 characters. 

### smallcaps (Array of String)

Paragraphs or sentences in HTML, sprinkled with small caps words formatted like this:

```html
<span style='font-variant-caps: all-small-caps;'>AWOL<span> 
```

### gotchas (Array of Object)

Typographic challenges specific to given language, e.g. required ligatures, kerning/spacing pairs (also for punctuation), things to look out for when adding language support to a font. 

Fields:

#### topic (String)

Concerned letters or their names (applies to diacritics), or other concise description of the issue.

#### tags (Array of String)

Each element is one of `(metrics|ligature|contextual|localization|congruency|optional)`, where:

* `metrics` — is related to spacing or kerning,
* `ligature` — concerns a possibly needed ligature,
* `contextual` — concerns a possibly needed contextual alternate,
* `localization` — is related to alternate localized glyphs, (gotchas without this tag are just pointers to making a better font in general)* `congruency` — regards interplay between design of particular glyphs
* `optional` — means the issue might be considered irrelevant (the feature it describes is more `nice-to-have` than `must-have`).

#### tests (Array of String)

Strings that can be used to test a font against the issue.

### specialCharacters (String)

Special characters (mainly accented letters — diacritics) used by the language.

### alphabet (String)

The letters of the language's alphabet in order, separated by spaces. Typically A-Z with `specialCharacters` intertwined or appended, depending on the language's convention. 

