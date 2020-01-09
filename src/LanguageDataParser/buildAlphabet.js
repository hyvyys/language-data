export default function sortAlphabet(alphabet, locale) {
  alphabet = alphabet.toLowerCase() + ' ' + alphabet.toUpperCase();
  // alphabet = alphabet.replace(/i̇/g, 'i'); // replace i followed by combining dot above
  let array = alphabet.split(" ").filter(c => c);
  array = Array.from(new Set(array));
  // console.log(locale);
  try {
    array.sort((a, b) => a.localeCompare(b, locale, { caseFirst: 'upper' }));
  }
  catch (e) {
    
  }
  finally {
    array.sort((a, b) => a.localeCompare(b, 'en', { caseFirst: 'upper' }));
  }
  return array.join(' ');
}