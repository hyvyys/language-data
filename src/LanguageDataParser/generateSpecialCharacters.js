import GraphemeSplitter from "grapheme-splitter";
import genCharArray from "./generateCharArray";
import extendCharSet from "./extendCharSet";
import charsetChangeReason from "./charsetChangeReason";
import escapeRegExp from "./escapeRegExp";

export default function (entry, originalEntry) {
  let letters = (entry.specialCharacters || entry.alphabet || '').split(/\s+/g).filter(c => c);

  if (entry.script === 'Latn' || entry.script === 'Cyrl') {
    if (letters.length === 0) {
      let pangram = [
        ...entry.pangrams,
        ...entry.letterings,
        ...entry.paragraphs,
        ...entry.sentences
      ].join('');

      let str = pangram.toLowerCase() + pangram.toUpperCase();

      if (str.indexOf('ı') > -1) { // if "ı" is present, it is a Turkic language
        str += 'İ'; // "i".toUpperCase() returns I instead of İ, so add it manually
      }
      
      str = str.replace(/i̇/g, 'i'); // i followed by combining dot above => just "i"
      
      const splitter = new GraphemeSplitter();
      const graphemes = splitter.splitGraphemes(str);
      const set = new Set(graphemes);
      letters = Array.from(set)
    }

    const abc = [...genCharArray('a', 'z'), ...genCharArray('а','я')].join('');
    const digits = '0-9';
    const punct = escapeRegExp(',.;:!?"„“”()[]{}–—') + '\\-\\s';
    const regex = new RegExp(`^[ ${abc + digits + punct}]*$`, 'i');
    letters = letters.filter(c => !regex.test(c));
  }

  let locl = entry.htmlTag ? (entry.htmlTag + '-' + entry.script) : 'en';
  let specialCharacters = extendCharSet(letters.join(' '), locl);
  if (!entry.specialCharacters) {
    return specialCharacters;
  } else if (entry.specialCharacters !== specialCharacters) {
    // const reason = charsetChangeReason(entry.specialCharacters, specialCharacters);
    if (!entry.alphabetIsSorted) {
        this.info(`[!] Consider changing specialCharacters for language ${entry.language}\nfrom "${entry.specialCharacters}"\n  to "${specialCharacters}", or set \`alphabetIsSorted\``);
        if (entry.specialCharacters.split(' ').length > specialCharacters.split(' ').length) {
          this.info(`  (preserve digraphs in the alphabet field, though)`);
        }
        // this.info(`[!] Consider changing specialCharacters for language ${entry.language} to "${specialCharacters}" ${reason}.`);
    }
  }
  return entry.specialCharacters;
}