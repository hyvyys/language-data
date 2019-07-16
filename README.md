# The Project

Pangrams, sample sentences, character sets and metadata for the languages of the world. Extent and completeness of the data is limited, contributions are welcome!

# Structure

The data is stored as a JavaScript constant exported from ES6 module in /Languages.js. It could be a JSON file, but I opted for JS instead because this way it can be very well used on localhost.
Entry format is described in /format.js. The structure is dynamic and new fields added to the main file should be annotated there.

# Roadmap

  * add missing fields `tag`; tags are needed especially when more than one sample of type is present for language (+1 pangram, +1 paragraph etc.)
  * add missing fields `script`
  * add missing fields `pangram`
  * add missing fields `lettering` // this will take a while, unless a script is * * developed to automate this using Wiktionary
  * add missing fields `alphabet`
  * add missing fields `specialCharacters`

# Usage

A sanitized version of the data is exported from /index.js (with missing fields added so that they don't need to be checked for in code that uses the module).