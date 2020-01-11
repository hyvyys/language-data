import genCharArray from "./generateCharArray";
import extendCharSet from "./extendCharSet";
import charsetChangeReason from "./charsetChangeReason";
import escapeRegExp from "./escapeRegExp";

export default function (entry, originalEntry) {
  let alphabet = entry.alphabet || '';
  let specialCharacters = entry.specialCharacters || '';
  if (entry.script === 'Latn'
    // && (originalEntry.specialCharacters != null || entry.specialCharacters)
    // && entry.htmlTag
  ) {
    let az = alphabet || genCharArray('a', 'z').join(' ');
    let letters = [ ...az.split(/\s+/g), ...specialCharacters.split(' ') ];
    const digits = '0-9';
    const punct = escapeRegExp(',.;:!?"„“”()[]{}–—') + '\\-\\s';
    const regex = new RegExp(`[ ${digits + punct}]`, 'i');
    letters = letters.filter(c => !regex.test(c));

    let newAlphabet = extendCharSet(letters.join(' '), (entry.htmlTag || 'en' ) + '-Latn');
    // if (entry.language === 'Hausa') console.log(newAlphabet)

    if (!entry.alphabet) {
      return newAlphabet;
    } else if (entry.alphabet !== newAlphabet) {
      const reason = true; //charsetChangeReason(entry.alphabet, newAlphabet);
    // if (entry.language === 'Hausa') console.log(reason)
    if (!entry.alphabetIsSorted) {
        // this.info(`[!] Consider changing alphabet for language ${entry.language} to "${newAlphabet}" ${reason}.`);
        this.info(`[!] Consider changing alphabet for language ${entry.language}\nfrom "${entry.alphabet}"\n  to "${newAlphabet}"`);
      }
    }
  }
  return alphabet;
}