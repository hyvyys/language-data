function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
  }
  return a;
}

export default function (entry) {
  let alphabet = entry.alphabet || '';
  if (entry.script == 'Latn' && entry.specialCharacters && entry.htmlTag) {
    const az = genCharArray('a', 'z');
    const AZ = genCharArray('A', 'Z');
    alphabet = [ ...az, ...AZ, ...entry.specialCharacters.split(' ') ]
      .sort((a, b) => a.localeCompare(b, entry.htmlTag + '-Latn', { caseFirst: 'upper' }))
      .join(' ');
    console.log(alphabet)
  }
  return alphabet;
}