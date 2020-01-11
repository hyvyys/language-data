import genCharArray from "./generateCharArray";
import escapeRegExp from "./escapeRegExp";

const az = genCharArray('a','z');

export default function (oldSet, newSet) {
  const punct = new RegExp('[' + escapeRegExp(',.;:!?"„“”()[]{}–—-') + ']');
  if (punct.test(oldSet)) return "to remove punctuation";
  
  if (oldSet.replace(/ +/g, ' ').trim() === newSet)
    return 'to remove redundant whitespace';
  if (oldSet.split(' ').length > newSet.split(' ').length) return null; // case for triple-case: NJ Nj nj

  const missingChars = newSet.split(' ').filter(l => oldSet.split(' ').indexOf(l) === -1);
  if (missingChars.length && missingChars.filter(c => az.indexOf(c.toLowerCase()) === -1).length === 0)
    return null;
  const reason = oldSet.length !== newSet.length ?
    ('to include ' + (missingChars.length ? 'missing characters: ' + missingChars.join(' ') : 'both lower and uppercase'))
    : 'for better sorting';
  return reason;
}