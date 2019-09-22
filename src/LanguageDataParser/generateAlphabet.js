import genCharArray from "./generateCharArray";

export default function (entry, originalEntry) {
  let alphabet = entry.alphabet || '';
  if (entry.script == 'Latn' 
    && (originalEntry.specialCharacters != null || entry.specialCharacters)
    && entry.htmlTag
  ) {
    const az = genCharArray('a', 'z');
    const AZ = genCharArray('A', 'Z');
    alphabet = [ ...az, ...AZ, ...entry.specialCharacters.split(' ').filter(c => c) ]
      .sort((a, b) => a.localeCompare(b, entry.htmlTag + '-Latn', { caseFirst: 'upper' }))
      .join(' ');
  }
  return alphabet;
}