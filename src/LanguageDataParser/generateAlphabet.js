import genCharArray from "./generateCharArray";
import buildAlphabet from "./buildAlphabet";

export default function (entry, originalEntry) {
  let alphabet = entry.alphabet || '';
  if (entry.script == 'Latn' 
    && (originalEntry.specialCharacters != null || entry.specialCharacters)
    && entry.htmlTag
  ) {
    let letters = [ ...genCharArray('a', 'z'), ...entry.specialCharacters.split(' ').filter(c => c) ];
    alphabet = buildAlphabet(letters.join(' '), entry.htmlTag + '-Latn');
  }
  return alphabet;
}