if (process.argv.length < 3) {
  console.log(`Insufficient arguments. Example usage:
  node sortAlphabet.js "A B C D a b c d" "de-Latn"
  `);
  return;
}

let locale = "en-Latn";
if (process.argv.length >= 4)
locale = process.argv[3];

let alphabet = process.argv[2];
alphabet = alphabet.toLowerCase() + ' ' + alphabet.toUpperCase();
let array = alphabet.split(" ").filter(c => c);
array = Array.from(new Set(array));
array.sort((a, b) => a.localeCompare(b, locale, { caseFirst: 'upper' }));

console.log(array.join(' '));