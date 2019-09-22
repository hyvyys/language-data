import genCharArray from "./generateCharArray";

export default function (entry, originalEntry) {
  let pangram = (entry.alphabet && [entry.alphabet]
    || entry.pangrams
    || [ ...entry.letteringsm, ...entry.paragraphs, ...entry.sentences]
  ).join('');
  let specialCharacters = '';
  if (entry.script == 'Latn') {
    const abc = genCharArray('a', 'z');
    const letters = pangram.replace(new RegExp(`[${abc.join('')} ,.;:!?"'„“”‘’()–—-]`, 'gi'), '');
    const set = new Set(letters.toLowerCase() + letters.toUpperCase());
    specialCharacters = Array.from(set)
      .sort((a, b) => a.localeCompare(b, entry.htmlTag + '-Latn', { caseFirst: 'upper' }))
      .join(' ');
  }
  return specialCharacters;
}