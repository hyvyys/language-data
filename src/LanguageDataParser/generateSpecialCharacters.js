import GraphemeSplitter from "grapheme-splitter";
import genCharArray from "./generateCharArray";
import buildAlphabet from "./buildAlphabet";

export default function (entry, originalEntry) {
  let letters = (entry.specialCharacters || '').split(' ').filter(c => c);
  if (entry.script == 'Latn') {
    if (letters.length === 0 && originalEntry.alphabet) {
      letters = originalEntry.alphabet.split(' ');
    }
    else if (letters.length === 0) {
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

    const abc = genCharArray('a', 'z').join('');
    const digits = '0-9';
    const punct = ' ,.;:!?"\'„“”‘’()\\[\\]{}–—-';
    const regex = new RegExp(`^[${abc + digits + punct}]$`, 'i');
    letters = letters
      .filter(c => c)
      .filter(c => c !== ' ')
      .filter(c => !regex.test(c));
  }

  let specialCharacters = buildAlphabet(letters.join(' '), entry.htmlTag + '-' + entry.script);
  return specialCharacters;
}