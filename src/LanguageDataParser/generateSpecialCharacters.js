import genCharArray from "./generateCharArray";

export default function (entry, originalEntry) {
  let letters = [];
  if (originalEntry.alphabet) {
    letters = originalEntry.alphabet.split(' ');
  }
  else {
    let pangram = (entry.pangrams
      || [ ...entry.letteringsm, ...entry.paragraphs, ...entry.sentences]
    ).join('');
    let str = pangram.toLowerCase() + pangram.toUpperCase()
    // won't work for combining diacritics - TODO
    const set = new Set(str.split(''));
    letters = Array.from(set)
  }
  
  let specialCharacters = '';
  if (entry.script == 'Latn') {
    const abc = genCharArray('a', 'z').join('');
    const punct = ' ,.;:!?"\'„“”‘’()\\[\\]{}–—-';
    const regex = new RegExp(`^[${abc + punct}]$`, 'i');
    specialCharacters = letters
      .filter(c => c)
      .filter(c => c !== ' ')
      .filter(c => !regex.test(c))
      .sort((a, b) => a.localeCompare(b, entry.htmlTag + '-Latn', { caseFirst: 'upper' }))
      .join(' ');
  }
  return specialCharacters;
}